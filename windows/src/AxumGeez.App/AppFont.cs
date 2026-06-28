using System.IO;

namespace AxumGeez.App;

public static class AppFont
{
    public const string AxumRoyal = "Axum Royal";
    public const string AxumModern = "Axum Modern";
    public const string Brana = "Brana";
    public const string Default = "Default";
    public const string System = "System";

    public static string[] Options => [Brana, Default, AxumRoyal, AxumModern, System];

    public static System.Windows.Media.FontFamily Resolve(string? selected)
    {
        return selected switch
        {
            AxumRoyal => ResolveBundled("AbyssinicaSIL-Regular.ttf", "Abyssinica SIL"),
            AxumModern => ResolveBundled("NotoSansEthiopic-Regular.ttf", "Noto Sans Ethiopic"),
            Brana => IsBranaAvailable()
                ? new System.Windows.Media.FontFamily("Brana")
                : new System.Windows.Media.FontFamily("Nyala, Ebrima, Segoe UI"),
            Default => new System.Windows.Media.FontFamily("Nyala, Ebrima, Segoe UI"),
            _ => new System.Windows.Media.FontFamily("Segoe UI")
        };
    }

    public static string IconGlyph(string? selected, AxumGeez.Input.InputMode mode)
    {
        if (mode == AxumGeez.Input.InputMode.English)
        {
            return "E";
        }

        return Normalize(selected) == Brana ? "ቢ" : "አ";
    }

    public static string Normalize(string? selected) =>
        Options.Contains(selected) ? selected! : AxumRoyal;

    private static System.Windows.Media.FontFamily ResolveBundled(string fileName, string familyName)
    {
        var fontsPath = Path.Combine(AppContext.BaseDirectory, "Fonts");
        var fontFile = Path.Combine(fontsPath, fileName);
        if (!File.Exists(fontFile))
        {
            return new System.Windows.Media.FontFamily("Nyala, Ebrima, Segoe UI");
        }

        var uri = new Uri(fontsPath + Path.DirectorySeparatorChar, UriKind.Absolute);
        return new System.Windows.Media.FontFamily(uri, $"./#{familyName}");
    }

    private static bool IsBranaAvailable()
    {
        var fonts = Environment.GetFolderPath(Environment.SpecialFolder.Fonts);
        return Directory.EnumerateFiles(fonts, "*brana*", SearchOption.TopDirectoryOnly).Any();
    }
}
