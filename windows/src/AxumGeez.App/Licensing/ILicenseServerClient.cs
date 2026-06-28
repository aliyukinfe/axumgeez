namespace AxumGeez.App.Licensing;

public interface ILicenseServerClient
{
    Task<LicenseServerResponse> RegisterAsync(LicenseRegisterRequest request, CancellationToken cancellationToken);
    Task<LicenseServerResponse> ValidateAsync(LicenseValidateRequest request, CancellationToken cancellationToken);
    Task SendHeartbeatAsync(LicenseHeartbeatRequest request, CancellationToken cancellationToken);
}
