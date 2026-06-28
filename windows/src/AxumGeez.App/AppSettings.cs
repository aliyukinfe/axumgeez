using AxumGeez.Core;

namespace AxumGeez.App;

public sealed class AppSettings
{
    public bool IsEnabled { get; set; } = true;
    public bool StartWithWindows { get; set; }
    public bool ShowFloatingToolbar { get; set; } = true;
    public bool PlayTypingSound { get; set; }
    public bool ConvertPunctuation { get; set; } = true;
    public bool UseEthiopicNumerals { get; set; }
    public string Theme { get; set; } = "System";
    public string SelectedFont { get; set; } = AppFont.AxumRoyal;
    public string ToggleShortcut { get; set; } = "Ctrl+Space";
    public string AlternateToggleShortcut { get; set; } = "Alt+Shift+A";
    public string LicenseServerUrl { get; set; } = "";

    public static AppSettings Default => new();

    public TransliterationSettings ToTransliterationSettings() =>
        new(ConvertPunctuation, UseEthiopicNumerals);
}
