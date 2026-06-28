using System.Windows;
using AxumGeez.Core;
using AxumGeez.Input;
using AxumGeez.Core.Licensing;
using AxumGeez.App.Licensing;

namespace AxumGeez.App;

public partial class App : System.Windows.Application
{
    private NotifyIconHost? _notifyIcon;
    private GlobalAmharicInputService? _inputService;
    private MainWindow? _mainWindow;
    private AppSettingsStore? _settingsStore;
    private LicenseManager? _licenseManager;
    private LicenseValidationResult _licenseResult = LicenseValidationResult.Allow("Free local mode.");
    private AppSettings _settings = AppSettings.Default;

    protected override async void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        _settingsStore = new AppSettingsStore();
        _settings = _settingsStore.Load();
        _settings.SelectedFont = AppFont.Normalize(_settings.SelectedFont);
        _licenseManager = new LicenseManager(_settings);
        _licenseResult = await _licenseManager.ValidateStartupAsync();

        _inputService = new GlobalAmharicInputService();
        _inputService.ApplySettings(_settings.ToTransliterationSettings());
        _inputService.ConfigureShortcuts(_settings.ToggleShortcut, _settings.AlternateToggleShortcut);
        _inputService.ModeChanged += OnModeChanged;
        if (_settings.IsEnabled && _licenseResult.CanType)
        {
            _inputService.Start();
        }

        _notifyIcon = new NotifyIconHost(
            GetTrayState,
            ToggleEnabled,
            SetMode,
            SetFont,
            ShowMain,
            ShowSettings,
            ShowHelp,
            ToggleStartWithWindows,
            CopyAxumRoyal,
            ShowAbout,
            ExitApplication);
        _notifyIcon.Show();

        ShowMain();
        ShowLicenseNoticeIfNeeded(_licenseResult);
        RefreshUi();
    }

    private void OnModeChanged(object? sender, ModeChangedEventArgs e)
    {
        RefreshUi();
        ToastWindow.ShowToast(e.Mode == InputMode.Amharic ? "Mode: አማ" : "Mode: EN");
    }

    private void ShowMain()
    {
        if (_mainWindow is null)
        {
            _mainWindow = new MainWindow(ShowSettings);
            _mainWindow.Closed += (_, _) => _mainWindow = null;
        }

        RefreshUi();
        _mainWindow.Show();
        _mainWindow.Activate();
    }

    private async void ShowSettings()
    {
        var window = new SettingsWindow(_settings);
        if (window.ShowDialog() == true)
        {
            _settings = window.Settings;
            _settings.SelectedFont = AppFont.Normalize(_settings.SelectedFont);
            _settingsStore?.Save(_settings);
            _licenseManager = new LicenseManager(_settings);
            _licenseResult = await _licenseManager.ValidateStartupAsync();
            _inputService?.ApplySettings(_settings.ToTransliterationSettings());
            _inputService?.ConfigureShortcuts(_settings.ToggleShortcut, _settings.AlternateToggleShortcut);
            RefreshUi();
        }
    }

    private void ShowHelp()
    {
        new HelpWindow(_settings.SelectedFont).Show();
    }

    private static void ShowAbout()
    {
        System.Windows.MessageBox.Show(
            "አክሱም ግዕዝ\n\nAxum Geez for Windows 10 and Windows 11.\n\nBlue, black, and white professional input tool. Types Unicode Amharic/Geez globally. External apps control their own fonts.\n\nOffline. No ads. No data collection.",
            "About",
            MessageBoxButton.OK,
            MessageBoxImage.Information);
    }

    private TrayMenuState GetTrayState() => new(
        _settings.IsEnabled && _licenseResult.CanType,
        _settings.IsEnabled && _licenseResult.CanType ? (_inputService?.Mode ?? InputMode.Amharic) : InputMode.English,
        _settings.SelectedFont,
        _settings.StartWithWindows);

    private void ToggleEnabled()
    {
        if (!_licenseResult.CanType)
        {
            ShowLicenseNoticeIfNeeded(_licenseResult, force: true);
            return;
        }

        _settings.IsEnabled = !_settings.IsEnabled;
        if (_settings.IsEnabled)
        {
            _inputService?.Start();
            ToastWindow.ShowToast("Axum Geez ON");
        }
        else
        {
            _inputService?.Stop();
            ToastWindow.ShowToast("Axum Geez OFF");
        }

        _settingsStore?.Save(_settings);
        RefreshUi();
    }

    private void SetMode(InputMode mode)
    {
        if (!_licenseResult.CanType)
        {
            ShowLicenseNoticeIfNeeded(_licenseResult, force: true);
            return;
        }

        if (!_settings.IsEnabled)
        {
            _settings.IsEnabled = true;
            _inputService?.Start();
        }

        _inputService?.SetMode(mode);
        _settingsStore?.Save(_settings);
        RefreshUi();
    }

    private void ShowLicenseNoticeIfNeeded(LicenseValidationResult result, bool force = false)
    {
        if (!force && result.CanType && result.Status == SubscriptionStatus.Active)
        {
            return;
        }

        if (result.UserMessage.Contains("subscription-based", StringComparison.OrdinalIgnoreCase))
        {
            System.Windows.MessageBox.Show(
                "Axum Geez is now subscription-based.\nPlease subscribe to continue using premium typing services.",
                "Subscription notice",
                MessageBoxButton.OK,
                MessageBoxImage.Information);
            return;
        }

        if (result.Status == SubscriptionStatus.Expired)
        {
            System.Windows.MessageBox.Show(
                "Subscription expired.\n\nRenew Subscription\nContact Support\nExit",
                "Subscription expired",
                MessageBoxButton.OK,
                MessageBoxImage.Warning);
            return;
        }

        if (!result.CanType || force)
        {
            System.Windows.MessageBox.Show(
                result.UserMessage,
                "Axum Geez license",
                MessageBoxButton.OK,
                result.CanType ? MessageBoxImage.Information : MessageBoxImage.Warning);
        }
    }

    private void SetFont(string font)
    {
        _settings.SelectedFont = AppFont.Normalize(font);
        _settingsStore?.Save(_settings);
        RefreshUi();
    }

    private void ToggleStartWithWindows()
    {
        _settings.StartWithWindows = !_settings.StartWithWindows;
        _settingsStore?.Save(_settings);
        RefreshUi();
    }

    private static void CopyAxumRoyal()
    {
        FontClipboardService.CopyAxumRoyalPreview();
        ToastWindow.ShowToast("Copied styled preview");
    }

    private void RefreshUi()
    {
        var canType = _settings.IsEnabled && _licenseResult.CanType;
        var mode = canType ? (_inputService?.Mode ?? InputMode.Amharic) : InputMode.English;
        if (!canType)
        {
            _inputService?.Stop();
        }
        _notifyIcon?.Refresh();
        _mainWindow?.Apply(_settings, mode, _licenseResult);
    }

    private void ExitApplication()
    {
        _notifyIcon?.Dispose();
        _inputService?.Dispose();
        Shutdown();
    }
}
