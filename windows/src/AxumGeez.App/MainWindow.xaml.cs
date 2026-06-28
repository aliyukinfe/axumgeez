using System.Windows;
using AxumGeez.Input;
using AxumGeez.Core.Licensing;

namespace AxumGeez.App;

public partial class MainWindow : Window
{
    private readonly Action _openSettings;

    public MainWindow(Action openSettings)
    {
        InitializeComponent();
        _openSettings = openSettings;
    }

    public void Apply(AppSettings settings, InputMode mode, LicenseValidationResult license)
    {
        var active = settings.IsEnabled && license.CanType;
        StatusText.Text = active ? "ON" : "OFF";
        StatusText.Foreground = active
            ? (System.Windows.Media.Brush)FindResource("PrimaryBlue")
            : (System.Windows.Media.Brush)FindResource("DarkSurface");
        ModeText.Text = $"Current mode: {(mode == InputMode.Amharic ? "አማ" : "EN")}";
        FontNameText.Text = $"Selected font: {AppFont.Normalize(settings.SelectedFont)}";
        ShortcutText.Text = $"Shortcut: {settings.ToggleShortcut}";
        LicenseText.Text = $"License: {license.Status} - {license.UserMessage}";
    }

    private void OpenSettings(object sender, RoutedEventArgs e) => _openSettings();
}
