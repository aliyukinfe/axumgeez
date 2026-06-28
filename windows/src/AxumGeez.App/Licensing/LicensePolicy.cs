namespace AxumGeez.App.Licensing;

public static class LicensePolicy
{
    public static TimeSpan OnlineValidationInterval { get; } = TimeSpan.FromDays(1);
    public static TimeSpan OfflineAllowance { get; } = TimeSpan.FromDays(7);
    public static TimeSpan EmergencyOfflinePeriod { get; } = TimeSpan.FromDays(1);
    public static TimeSpan ExpiredSubscriptionGrace { get; } = TimeSpan.FromDays(3);
    public static TimeSpan EmergencyUnlockDuration { get; } = TimeSpan.FromHours(72);
    public static TimeSpan SubscriptionRequiredGrace { get; } = TimeSpan.FromDays(30);
}
