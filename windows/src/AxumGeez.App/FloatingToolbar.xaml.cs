using System.Windows;
using System.Windows.Input;
using AxumGeez.Input;

namespace AxumGeez.App;

public partial class FloatingToolbar : Window
{
    public FloatingToolbar()
    {
        InitializeComponent();
        Left = SystemParameters.WorkArea.Right - Width - 24;
        Top = SystemParameters.WorkArea.Top + 24;
    }

    public void Apply(bool isEnabled, AxumGeez.Input.InputMode mode)
    {
        if (isEnabled && mode == AxumGeez.Input.InputMode.Amharic)
        {
            ModeText.Text = "አማ ON";
            Pill.Background = (System.Windows.Media.Brush)FindResource("PrimaryBlue");
        }
        else
        {
            ModeText.Text = "EN OFF";
            Pill.Background = (System.Windows.Media.Brush)FindResource("DarkSurface");
        }
    }

    private void DragToolbar(object sender, MouseButtonEventArgs e)
    {
        if (e.ButtonState == MouseButtonState.Pressed)
        {
            DragMove();
        }
    }
}
