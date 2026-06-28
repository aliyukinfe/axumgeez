using System.IO;
using System.Text.Json;

namespace AxumGeez.App.Licensing;

public sealed class LicenseStateStore
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly string _path = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
        "AxumGeez",
        "license-state.json");

    public StoredLicenseState Load()
    {
        if (!File.Exists(_path))
        {
            return new StoredLicenseState();
        }

        try
        {
            return JsonSerializer.Deserialize<StoredLicenseState>(File.ReadAllText(_path), JsonOptions)
                ?? new StoredLicenseState();
        }
        catch
        {
            return new StoredLicenseState();
        }
    }

    public void Save(StoredLicenseState state)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_path)!);
        File.WriteAllText(_path, JsonSerializer.Serialize(state, JsonOptions));
    }
}
