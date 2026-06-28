namespace AxumGeez.Core.Licensing;

public sealed record LicenseEnvelope
{
    public string Algorithm { get; init; } = "RS256";
    public string KeyId { get; init; } = "prod-2026-01";
    public string Payload { get; init; } = "";
    public string Signature { get; init; } = "";
}
