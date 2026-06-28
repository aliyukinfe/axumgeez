using System.Windows;
using System.Windows.Threading;

namespace AxumGeez.App;

public partial class ToastWindow : Window
{
    public ToastWindow(string message)
    {
        InitializeComponent();
        MessageText.Text = message;
        Left = SystemParameters.WorkArea.Right - Width - 24;
        Top = SystemParameters.WorkArea.Bottom - Height - 24;
    }

    public static void ShowToast(string message)
    {
        var toast = new ToastWindow(message);
        var timer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1.8) };
        timer.Tick += (_, _) =>
        {
            timer.Stop();
            toast.Close();
        };
        toast.Show();
        timer.Start();
    }
}
