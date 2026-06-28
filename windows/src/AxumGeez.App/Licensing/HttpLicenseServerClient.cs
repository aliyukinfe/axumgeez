using System.Net.Http;
using System.Net.Http.Json;

namespace AxumGeez.App.Licensing;

public sealed class HttpLicenseServerClient(HttpClient httpClient, string baseUrl) : ILicenseServerClient
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _baseUrl = baseUrl.TrimEnd('/');

    public async Task<LicenseServerResponse> RegisterAsync(LicenseRegisterRequest request, CancellationToken cancellationToken)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/api/license/register", request, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<LicenseServerResponse>(cancellationToken)
            ?? throw new InvalidOperationException("License server returned an empty registration response.");
    }

    public async Task<LicenseServerResponse> ValidateAsync(LicenseValidateRequest request, CancellationToken cancellationToken)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/api/license/validate", request, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<LicenseServerResponse>(cancellationToken)
            ?? throw new InvalidOperationException("License server returned an empty validation response.");
    }

    public async Task SendHeartbeatAsync(LicenseHeartbeatRequest request, CancellationToken cancellationToken)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/api/license/heartbeat", request, cancellationToken);
        response.EnsureSuccessStatusCode();
    }
}
