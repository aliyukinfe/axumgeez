using System.Windows;
using System.Windows.Controls;

namespace AxumGeez.App;

public partial class SettingsWindow : Window
{
    public SettingsWindow(AppSettings settings)
    {
        InitializeComponent();
        Settings = new AppSettings
        {
            IsEnabled = settings.IsEnabled,
            StartWithWindows = settings.StartWithWindows,
            ShowFloatingToolbar = settings.ShowFloatingToolbar,
            PlayTypingSound = settings.PlayTypingSound,
            ConvertPunctuation = settings.ConvertPunctuation,
            UseEthiopicNumerals = settings.UseEthiopicNumerals,
            Theme = settings.Theme,
            SelectedFont = AppFont.Normalize(settings.SelectedFont),
            ToggleShortcut = settings.ToggleShortcut,
            AlternateToggleShortcut = settings.AlternateToggleShortcut,
            LicenseServerUrl = settings.LicenseServerUrl
        };

        StartWithWindowsCheckBox.IsChecked = Settings.StartWithWindows;
        LicenseServerUrlTextBox.Text = Settings.LicenseServerUrl;
        TypingSoundCheckBox.IsChecked = Settings.PlayTypingSound;
        ConvertPunctuationCheckBox.IsChecked = Settings.ConvertPunctuation;
        EthiopicNumeralsCheckBox.IsChecked = Settings.UseEthiopicNumerals;
        ShortcutTextBox.Text = Settings.ToggleShortcut;
        AlternateShortcutTextBox.Text = Settings.AlternateToggleShortcut;
        foreach (ComboBoxItem item in ThemeComboBox.Items)
        {
            if ((string)item.Content == Settings.Theme)
            {
                ThemeComboBox.SelectedItem = item;
                break;
            }
        }

        foreach (var font in AppFont.Options)
        {
            FontComboBox.Items.Add(font);
        }

        FontComboBox.SelectedItem = Settings.SelectedFont;
        ApplyFontPreview();
    }

    public AppSettings Settings { get; private set; }

    private void Save(object sender, RoutedEventArgs e)
    {
        Settings.StartWithWindows = StartWithWindowsCheckBox.IsChecked == true;
        Settings.PlayTypingSound = TypingSoundCheckBox.IsChecked == true;
        Settings.ConvertPunctuation = ConvertPunctuationCheckBox.IsChecked == true;
        Settings.UseEthiopicNumerals = EthiopicNumeralsCheckBox.IsChecked == true;
        Settings.Theme = ((ComboBoxItem?)ThemeComboBox.SelectedItem)?.Content?.ToString() ?? "System";
        Settings.SelectedFont = AppFont.Normalize(FontComboBox.SelectedItem?.ToString());
        Settings.ToggleShortcut = string.IsNullOrWhiteSpace(ShortcutTextBox.Text) ? "Ctrl+Space" : ShortcutTextBox.Text.Trim();
        Settings.AlternateToggleShortcut = string.IsNullOrWhiteSpace(AlternateShortcutTextBox.Text) ? "Alt+Shift+A" : AlternateShortcutTextBox.Text.Trim();
        Settings.LicenseServerUrl = LicenseServerUrlTextBox.Text.Trim();
        DialogResult = true;
    }

    private void Cancel(object sender, RoutedEventArgs e) => DialogResult = false;

    private void FontChanged(object sender, SelectionChangedEventArgs e) => ApplyFontPreview();

    private void ApplyFontPreview()
    {
        var selected = AppFont.Normalize(FontComboBox.SelectedItem?.ToString());
        FontPreviewText.FontFamily = AppFont.Resolve(selected);
        FontPreviewText.FontWeight = selected == AppFont.System ? FontWeights.Normal : FontWeights.SemiBold;
    }
}
