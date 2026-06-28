namespace AxumGeez.Core.Licensing;

public sealed record LicenseTokenPayload
{
    public string TokenId { get; init; } = "";
    public string UserId { get; init; } = "";
    public string DeviceId { get; init; } = "";
    public LicenseType LicenseType { get; init; } = LicenseType.Free;
    public SubscriptionStatus Status { get; init; } = SubscriptionStatus.Active;
    public DateTimeOffset IssuedAt { get; init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset ExpiresAt { get; init; } = DateTimeOffset.UtcNow.AddDays(30);
    public DateTimeOffset? SubscriptionStart { get; init; }
    public DateTimeOffset? SubscriptionEnd { get; init; }
    public string? PaymentReference { get; init; }
    public bool SubscriptionRequired { get; init; }
    public DateTimeOffset? SubscriptionRequiredAt { get; init; }
    public DateTimeOffset? SubscriptionGraceUntil { get; init; }
    public int TransfersUsedThisYear { get; init; }
    public int TransfersAllowedThisYear { get; init; } = 2;
    public string[] PremiumFeatures { get; init; } = [];
}
