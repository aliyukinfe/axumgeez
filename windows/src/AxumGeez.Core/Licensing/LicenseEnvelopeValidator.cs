using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace AxumGeez.Core.Licensing;

public sealed class LicenseEnvelopeValidator
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public LicenseTokenPayload ValidateAndRead(
        LicenseEnvelope envelope,
        string expectedDeviceId,
        string publicKeyPem)
    {
        if (!string.Equals(envelope.Algorithm, "RS256", StringComparison.Ordinal))
        {
            throw new InvalidOperationException("Unsupported license signature algorithm.");
        }

        var payloadBytes = Base64UrlDecode(envelope.Payload);
        var signatureBytes = Base64UrlDecode(envelope.Signature);

        using var rsa = RSA.Create();
        rsa.ImportFromPem(publicKeyPem);
        var valid = rsa.VerifyData(payloadBytes, signatureBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        if (!valid)
        {
            throw new CryptographicException("License signature verification failed.");
        }

        var token = JsonSerializer.Deserialize<LicenseTokenPayload>(payloadBytes, JsonOptions)
            ?? throw new InvalidOperationException("License payload is empty.");

        if (!string.Equals(token.DeviceId, expectedDeviceId, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("This copy belongs to another device.");
        }

        return token;
    }

    public static LicenseEnvelope SignForTests(LicenseTokenPayload payload, RSA privateKey, string keyId = "test")
    {
        var payloadBytes = JsonSerializer.SerializeToUtf8Bytes(payload, JsonOptions);
        var signature = privateKey.SignData(payloadBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        return new LicenseEnvelope
        {
            KeyId = keyId,
            Payload = Base64UrlEncode(payloadBytes),
            Signature = Base64UrlEncode(signature)
        };
    }

    public static string Base64UrlEncode(byte[] data) =>
        Convert.ToBase64String(data).TrimEnd('=').Replace('+', '-').Replace('/', '_');

    private static byte[] Base64UrlDecode(string value)
    {
        var padded = value.Replace('-', '+').Replace('_', '/');
        padded += new string('=', (4 - padded.Length % 4) % 4);
        return Convert.FromBase64String(padded);
    }
}
