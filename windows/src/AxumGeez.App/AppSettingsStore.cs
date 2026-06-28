using System.Text.Json;
using System.IO;
using Microsoft.Win32;

namespace AxumGeez.App;

public sealed class AppSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    private readonly string _settingsPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
        "AxumGeez",
        "settings.json");

    public AppSettings Load()
    {
        if (!File.Exists(_settingsPath))
        {
            return AppSettings.Default;
        }

        try
        {
            return JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(_settingsPath)) ?? AppSettings.Default;
        }
        catch
        {
            return AppSettings.Default;
        }
    }

    public void Save(AppSettings settings)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_settingsPath)!);
        File.WriteAllText(_settingsPath, JsonSerializer.Serialize(settings, JsonOptions));
        UpdateStartupRegistration(settings.StartWithWindows);
    }

    private static void UpdateStartupRegistration(bool enabled)
    {
        using var key = Registry.CurrentUser.OpenSubKey(
            @"Software\Microsoft\Windows\CurrentVersion\Run",
            writable: true);

        if (key is null)
        {
            return;
        }

        if (enabled)
        {
            key.SetValue("Axum Geez", Environment.ProcessPath ?? "AxumGeez.exe");
        }
        else
        {
            key.DeleteValue("Axum Geez", throwOnMissingValue: false);
        }
    }
}
