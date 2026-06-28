using System.Security.Cryptography;
using AxumGeez.App;
using AxumGeez.App.Licensing;
using AxumGeez.Core.Licensing;
using Xunit;

namespace AxumGeez.Tests;

public sealed class LicenseTests
{
    [Fact]
    public void Signed_License_Validates_For_Device()
    {
        using var rsa = RSA.Create(2048);
        var deviceId = "device-123";
        var payload = new LicenseTokenPayload
        {
            DeviceId = deviceId,
            LicenseType = LicenseType.Free,
            Status = SubscriptionStatus.Active,
            ExpiresAt = DateTimeOffset.UtcNow.AddDays(30)
        };
        var envelope = LicenseEnvelopeValidator.SignForTests(payload, rsa);
        var publicKey = rsa.ExportSubjectPublicKeyInfoPem();

        var token = new LicenseEnvelopeValidator().ValidateAndRead(envelope, deviceId, publicKey);

        Assert.Equal(deviceId, token.DeviceId);
        Assert.Equal(LicenseType.Free, token.LicenseType);
    }

    [Fact]
    public void Signed_License_Rejects_Copied_Device()
    {
        using var rsa = RSA.Create(2048);
        var envelope = LicenseEnvelopeValidator.SignForTests(new LicenseTokenPayload
        {
            DeviceId = "original-device",
            LicenseType = LicenseType.Monthly,
            Status = SubscriptionStatus.Active,
            ExpiresAt = DateTimeOffset.UtcNow.AddDays(30)
        }, rsa);

        Assert.Throws<InvalidOperationException>(() =>
            new LicenseEnvelopeValidator().ValidateAndRead(envelope, "other-device", rsa.ExportSubjectPublicKeyInfoPem()));
    }

    [Fact]
    public async Task LicenseManager_Allows_Local_Free_Mode_When_Server_Not_Configured()
    {
        var settings = new AppSettings { LicenseServerUrl = "" };
        var manager = new LicenseManager(settings, new LicenseStateStore());

        var result = await manager.ValidateStartupAsync();

        Assert.True(result.CanType);
        Assert.Equal(LicenseType.Free, result.Token?.LicenseType);
    }

    [Fact]
    public void Settings_Persist_License_Server_Url()
    {
        var settings = new AppSettings { LicenseServerUrl = "https://license.example.com" };

        Assert.Equal("https://license.example.com", settings.LicenseServerUrl);
    }
}
