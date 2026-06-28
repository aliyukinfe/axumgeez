using AxumGeez.Core.Licensing;

namespace AxumGeez.App.Licensing;

public sealed record StoredLicenseState
{
    public string? DeviceId { get; init; }
    public LicenseEnvelope? License { get; init; }
    public DateTimeOffset? LastValidationAt { get; init; }
    public DateTimeOffset? LastSeenClock { get; init; }
    public DateTimeOffset? EmergencyUnlockUntil { get; init; }
    public string? LastStatus { get; init; }
    public string? LastMessage { get; init; }
}
