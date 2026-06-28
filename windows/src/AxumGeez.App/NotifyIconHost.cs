using System.Drawing;
using System.Windows.Forms;
using AxumGeez.Input;

namespace AxumGeez.App;

public sealed class NotifyIconHost : IDisposable
{
    private readonly NotifyIcon _notifyIcon;
    private readonly ContextMenuStrip _menu = new();
    private readonly Func<TrayMenuState> _getState;
    private readonly Action _toggleEnabled;
    private readonly Action<InputMode> _setMode;
    private readonly Action<string> _setFont;
    private readonly Action _showSettings;
    private readonly Action _showHelp;
    private readonly Action _toggleStartWithWindows;
    private readonly Action _showAbout;
    private readonly Action _exit;
    private Icon? _currentIcon;

    public NotifyIconHost(
        Func<TrayMenuState> getState,
        Action toggleEnabled,
        Action<InputMode> setMode,
        Action<string> setFont,
        Action showMain,
        Action showSettings,
        Action showHelp,
        Action toggleStartWithWindows,
        Action copyAxumRoyal,
        Action showAbout,
        Action exit)
    {
        _getState = getState;
        _toggleEnabled = toggleEnabled;
        _setMode = setMode;
        _setFont = setFont;
        _showSettings = showSettings;
        _showHelp = showHelp;
        _toggleStartWithWindows = toggleStartWithWindows;
        _showAbout = showAbout;
        _exit = exit;

        _menu.Opening += (_, _) => RebuildMenu();
        _notifyIcon = new NotifyIcon
        {
            Text = "Axum Geez",
            ContextMenuStrip = _menu,
            Visible = false
        };
        _notifyIcon.MouseUp += OnMouseUp;
        UpdateIcon();
    }

    public void Show() => _notifyIcon.Visible = true;

    public void Refresh() => UpdateIcon();

    private void OnMouseUp(object? sender, MouseEventArgs e)
    {
        if (e.Button == MouseButtons.Left)
        {
            _toggleEnabled();
        }
    }

    private void RebuildMenu()
    {
        var state = _getState();
        _menu.Items.Clear();

        _menu.Items.Add(state.PowerText, null, (_, _) => _toggleEnabled());
        _menu.Items.Add(state.ModeText, null, (_, _) =>
        {
            _setMode(state.Mode == InputMode.Amharic ? InputMode.English : InputMode.Amharic);
        });
        _menu.Items.Add(BuildFontMenu(state));
        _menu.Items.Add("Change Font", null, (_, _) => _showSettings());
        _menu.Items.Add("Keyboard Layout", null, (_, _) => _showHelp());
        _menu.Items.Add("Settings", null, (_, _) => _showSettings());

        var startup = new ToolStripMenuItem("Start with Windows", null, (_, _) => _toggleStartWithWindows())
        {
            Checked = state.StartWithWindows
        };
        _menu.Items.Add(startup);

        _menu.Items.Add(new ToolStripSeparator());
        _menu.Items.Add("About", null, (_, _) => _showAbout());
        _menu.Items.Add("Exit", null, (_, _) => _exit());
    }

    private ToolStripMenuItem BuildFontMenu(TrayMenuState state)
    {
        var menu = new ToolStripMenuItem(state.FontText);
        foreach (var option in AppFont.Options)
        {
            var item = new ToolStripMenuItem(option, null, (_, _) => _setFont(option))
            {
                Checked = AppFont.Normalize(state.SelectedFont) == option
            };
            menu.DropDownItems.Add(item);
        }

        return menu;
    }

    private void UpdateIcon()
    {
        var state = _getState();
        _notifyIcon.Text = state.IsEnabled
            ? $"Axum Geez ON - {(state.Mode == InputMode.Amharic ? "አማ" : "EN")}"
            : "Axum Geez OFF";

        var next = CreateIcon(state);
        var old = _currentIcon;
        _currentIcon = next;
        _notifyIcon.Icon = next;
        old?.Dispose();
    }

    private static Icon CreateIcon(TrayMenuState state)
    {
        using var bitmap = new Bitmap(32, 32);
        using var graphics = Graphics.FromImage(bitmap);
        graphics.Clear(Color.Transparent);
        graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;

        var blue = Color.FromArgb(11, 92, 255);
        var black = Color.FromArgb(5, 7, 10);
        var deepBlue = Color.FromArgb(0, 59, 158);
        using var fill = new SolidBrush(state.IsEnabled ? blue : black);
        using var border = new Pen(state.IsEnabled ? black : deepBlue, 3);

        graphics.FillEllipse(fill, 3, 3, 26, 26);
        graphics.DrawEllipse(border, 3, 3, 26, 26);

        var label = state.IsEnabled && state.Mode == InputMode.Amharic ? "አ" : "AG";
        using var font = new Font(label == "AG" ? "Arial" : "Nyala", label == "AG" ? 11 : 14, FontStyle.Bold, GraphicsUnit.Pixel);
        using var brush = new SolidBrush(Color.White);
        var size = graphics.MeasureString(label, font);
        graphics.DrawString(label, font, brush, (32 - size.Width) / 2, (32 - size.Height) / 2);

        return Icon.FromHandle(bitmap.GetHicon());
    }

    public void Dispose()
    {
        _notifyIcon.Visible = false;
        _notifyIcon.Dispose();
        _currentIcon?.Dispose();
        _menu.Dispose();
    }
}
