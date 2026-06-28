namespace AxumGeez.Core.Licensing;

public sealed record LicenseValidationResult(
    bool CanType,
    SubscriptionStatus Status,
    string UserMessage,
    LicenseTokenPayload? Token)
{
    public static LicenseValidationResult Allow(string message, LicenseTokenPayload? token = null) =>
        new(true, token?.Status ?? SubscriptionStatus.Active, message, token);

    public static LicenseValidationResult Deny(SubscriptionStatus status, string message, LicenseTokenPayload? token = null) =>
        new(false, status, message, token);
}
