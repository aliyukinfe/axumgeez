using AxumGeez.Core.Licensing;

namespace AxumGeez.App.Licensing;

public sealed record LicenseRegisterRequest(
    string DeviceId,
    string AppVersion,
    string Platform);

public sealed record LicenseValidateRequest(
    string DeviceId,
    string AppVersion,
    LicenseEnvelope? CurrentLicense,
    DateTimeOffset LastSeen);

public sealed record LicenseHeartbeatRequest(
    string DeviceId,
    string AppVersion,
    string SubscriptionStatus,
    DateTimeOffset LastSeen);

public sealed record LicenseServerResponse(
    LicenseEnvelope License,
    DateTimeOffset ServerTime,
    string? Notice);
