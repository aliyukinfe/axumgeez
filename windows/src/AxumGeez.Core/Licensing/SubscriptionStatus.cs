namespace AxumGeez.Core.Licensing;

public enum SubscriptionStatus
{
    Active,
    Grace,
    Expired,
    Blocked,
    DeviceMismatch,
    ValidationRequired,
    ServerUnavailable,
    NotConfigured
}
