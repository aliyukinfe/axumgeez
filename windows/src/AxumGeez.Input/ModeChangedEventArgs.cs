namespace AxumGeez.Input;

public sealed class ModeChangedEventArgs(InputMode mode) : EventArgs
{
    public InputMode Mode { get; } = mode;
}
