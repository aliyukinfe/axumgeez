using System.Net.Http;
using System.Reflection;
using AxumGeez.Core.Licensing;

namespace AxumGeez.App.Licensing;

public sealed class LicenseManager
{
    private const string PublicKeyPem = """
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOue1xT2S7iM9lv0LwH7HkEjK1wYtQvr
c0gk0jI+l0vA88ZcF2EL4fS1V6grjB7y9zz9qvQdSyk2R6Un4vGpW9kCAwEAAQ==
-----END PUBLIC KEY-----
""";

    private readonly AppSettings _settings;
    private readonly LicenseStateStore _store;
    private readonly DeviceFingerprintProvider _fingerprintProvider;
    private readonly LicenseEnvelopeValidator _validator = new();
    private readonly ILicenseServerClient? _serverClient;

    public LicenseManager(
        AppSettings settings,
        LicenseStateStore? store = null,
        DeviceFingerprintProvider? fingerprintProvider = null,
        ILicenseServerClient? serverClient = null)
    {
        _settings = settings;
        _store = store ?? new LicenseStateStore();
        _fingerprintProvider = fingerprintProvider ?? new DeviceFingerprintProvider();
        _serverClient = serverClient ?? CreateServerClient(settings);
    }

    public async Task<LicenseValidationResult> ValidateStartupAsync(CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var deviceId = _fingerprintProvider.GetDeviceId();
        var state = _store.Load();

        if (state.LastSeenClock is not null && now < state.LastSeenClock.Value.AddMinutes(-10))
        {
            return SaveAndReturn(state, LicenseValidationResult.Deny(
                SubscriptionStatus.ValidationRequired,
                "System clock changed. Internet connection required for license verification."));
        }

        if (string.IsNullOrWhiteSpace(_settings.LicenseServerUrl))
        {
            var freeToken = new LicenseTokenPayload
            {
                DeviceId = deviceId,
                LicenseType = LicenseType.Free,
                Status = SubscriptionStatus.Active,
                ExpiresAt = now.AddYears(1)
            };
            return SaveAndReturn(state with
            {
                DeviceId = deviceId,
                LastSeenClock = now,
                LastStatus = "FreeLocal"
            }, LicenseValidationResult.Allow("Free local mode. Configure a license server to enforce subscriptions.", freeToken));
        }

        try
        {
            LicenseServerResponse response;
            if (state.License is null)
            {
                response = await _serverClient!.RegisterAsync(new LicenseRegisterRequest(
                    deviceId,
                    AppVersion(),
                    "Windows"), cancellationToken);
            }
            else if (state.LastValidationAt is null || now - state.LastValidationAt.Value >= LicensePolicy.OnlineValidationInterval)
            {
                response = await _serverClient!.ValidateAsync(new LicenseValidateRequest(
                    deviceId,
                    AppVersion(),
                    state.License,
                    now), cancellationToken);
            }
            else
            {
                var token = _validator.ValidateAndRead(state.License, deviceId, PublicKeyPem);
                return EvaluateToken(state with { DeviceId = deviceId, LastSeenClock = now }, token, now);
            }

            var validatedToken = _validator.ValidateAndRead(response.License, deviceId, PublicKeyPem);
            await _serverClient!.SendHeartbeatAsync(new LicenseHeartbeatRequest(
                deviceId,
                AppVersion(),
                validatedToken.Status.ToString(),
                now), cancellationToken);

            return EvaluateToken(state with
            {
                DeviceId = deviceId,
                License = response.License,
                LastValidationAt = response.ServerTime,
                LastSeenClock = now
            }, validatedToken, response.ServerTime);
        }
        catch (Exception ex)
        {
            return EvaluateOffline(state with
            {
                DeviceId = deviceId,
                LastSeenClock = now,
                LastMessage = ex.Message
            }, now);
        }
    }

    public LicenseValidationResult ApplyEmergencyUnlock(string code)
    {
        // The production server should issue signed emergency codes. This client-side shape is intentionally
        // isolated so the code verifier can be swapped for signed code validation without touching the UI.
        if (!code.StartsWith("AXUM-", StringComparison.OrdinalIgnoreCase) || code.Length < 12)
        {
            return LicenseValidationResult.Deny(SubscriptionStatus.ValidationRequired, "Emergency unlock code is invalid.");
        }

        var now = DateTimeOffset.UtcNow;
        var state = _store.Load() with
        {
            EmergencyUnlockUntil = now.Add(LicensePolicy.EmergencyUnlockDuration),
            LastSeenClock = now,
            LastStatus = "EmergencyUnlock"
        };
        _store.Save(state);
        return LicenseValidationResult.Allow("Emergency unlock active for 72 hours.");
    }

    private LicenseValidationResult EvaluateToken(StoredLicenseState state, LicenseTokenPayload token, DateTimeOffset now)
    {
        if (token.Status == SubscriptionStatus.Blocked)
        {
            return SaveAndReturn(state, LicenseValidationResult.Deny(SubscriptionStatus.Blocked, "This device has been blocked. Contact support.", token));
        }

        if (token.Status == SubscriptionStatus.DeviceMismatch)
        {
            return SaveAndReturn(state, LicenseValidationResult.Deny(SubscriptionStatus.DeviceMismatch, "This copy belongs to another device.", token));
        }

        if (token.SubscriptionRequired && token.LicenseType == LicenseType.Free)
        {
            var graceUntil = token.SubscriptionGraceUntil
                ?? token.SubscriptionRequiredAt?.Add(LicensePolicy.SubscriptionRequiredGrace)
                ?? now.Add(LicensePolicy.SubscriptionRequiredGrace);

            if (now > graceUntil)
            {
                return SaveAndReturn(state, LicenseValidationResult.Deny(
                    SubscriptionStatus.Expired,
                    "Axum Geez is now subscription-based. Please subscribe to continue using premium typing services.",
                    token));
            }

            return SaveAndReturn(state, LicenseValidationResult.Allow(
                "Axum Geez is now subscription-based. Please subscribe within the grace period to continue.",
                token));
        }

        if (token.SubscriptionEnd is not null && now > token.SubscriptionEnd.Value)
        {
            if (now <= token.SubscriptionEnd.Value.Add(LicensePolicy.ExpiredSubscriptionGrace))
            {
                return SaveAndReturn(state, LicenseValidationResult.Allow("Subscription expired. Please renew within 3 days.", token));
            }

            return SaveAndReturn(state, LicenseValidationResult.Deny(SubscriptionStatus.Expired, "Subscription expired.", token));
        }

        return SaveAndReturn(state, LicenseValidationResult.Allow("License verified.", token));
    }

    private LicenseValidationResult EvaluateOffline(StoredLicenseState state, DateTimeOffset now)
    {
        if (state.EmergencyUnlockUntil is not null && now <= state.EmergencyUnlockUntil.Value)
        {
            return SaveAndReturn(state, LicenseValidationResult.Allow("Emergency unlock active."));
        }

        if (state.LastValidationAt is null)
        {
            return SaveAndReturn(state, LicenseValidationResult.Deny(
                SubscriptionStatus.ValidationRequired,
                "Internet connection required for first license verification."));
        }

        var offlineAge = now - state.LastValidationAt.Value;
        if (offlineAge <= LicensePolicy.OfflineAllowance)
        {
            return SaveAndReturn(state, LicenseValidationResult.Allow("Offline mode active. License will be checked when internet returns."));
        }

        if (offlineAge <= LicensePolicy.OfflineAllowance.Add(LicensePolicy.EmergencyOfflinePeriod))
        {
            return SaveAndReturn(state, LicenseValidationResult.Allow("Internet connection required for license verification. Emergency period active."));
        }

        return SaveAndReturn(state, LicenseValidationResult.Deny(
            SubscriptionStatus.ValidationRequired,
            "Internet connection required for license verification."));
    }

    private LicenseValidationResult SaveAndReturn(StoredLicenseState state, LicenseValidationResult result)
    {
        _store.Save(state with
        {
            LastStatus = result.Status.ToString(),
            LastMessage = result.UserMessage
        });
        return result;
    }

    private static ILicenseServerClient? CreateServerClient(AppSettings settings)
    {
        if (string.IsNullOrWhiteSpace(settings.LicenseServerUrl))
        {
            return null;
        }

        return new HttpLicenseServerClient(new HttpClient { Timeout = TimeSpan.FromSeconds(15) }, settings.LicenseServerUrl);
    }

    private static string AppVersion() =>
        Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "1.0.0";
}
