using AxumGeez.Input;

namespace AxumGeez.App;

public sealed record TrayMenuState(
    bool IsEnabled,
    InputMode Mode,
    string SelectedFont,
    bool StartWithWindows)
{
    public string PowerText => IsEnabled ? "Axum Geez: ON" : "Axum Geez: OFF";
    public string ModeText => $"Mode: {(Mode == InputMode.Amharic ? "አማ" : "EN")}";
    public string FontText => $"Font: {AppFont.Normalize(SelectedFont)}";
}
