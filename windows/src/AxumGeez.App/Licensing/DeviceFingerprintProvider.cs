using System.Security.Cryptography;
using System.Text;
using Microsoft.Win32;

namespace AxumGeez.App.Licensing;

public sealed class DeviceFingerprintProvider
{
    public string GetDeviceId()
    {
        var machineGuid = ReadMachineGuid();
        var userSid = System.Security.Principal.WindowsIdentity.GetCurrent().User?.Value ?? Environment.UserName;
        var material = $"AxumGeez|{machineGuid}|{Environment.MachineName}|{userSid}";
        return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(material))).ToLowerInvariant();
    }

    private static string ReadMachineGuid()
    {
        using var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Cryptography");
        return key?.GetValue("MachineGuid")?.ToString() ?? Environment.MachineName;
    }
}
