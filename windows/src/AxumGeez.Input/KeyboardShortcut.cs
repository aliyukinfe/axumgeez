namespace AxumGeez.Input;

public sealed record KeyboardShortcut(bool Ctrl, bool Alt, bool Shift, int VirtualKey)
{
    public static KeyboardShortcut CtrlSpace { get; } = new(true, false, false, 0x20);
    public static KeyboardShortcut AltShiftA { get; } = new(false, true, true, 0x41);

    public static KeyboardShortcut ParseOrDefault(string? text, KeyboardShortcut fallback)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return fallback;
        }

        var parts = text.Split('+', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        var ctrl = false;
        var alt = false;
        var shift = false;
        int? key = null;

        foreach (var part in parts)
        {
            if (part.Equals("ctrl", StringComparison.OrdinalIgnoreCase) || part.Equals("control", StringComparison.OrdinalIgnoreCase))
            {
                ctrl = true;
            }
            else if (part.Equals("alt", StringComparison.OrdinalIgnoreCase))
            {
                alt = true;
            }
            else if (part.Equals("shift", StringComparison.OrdinalIgnoreCase))
            {
                shift = true;
            }
            else if (part.Equals("space", StringComparison.OrdinalIgnoreCase))
            {
                key = 0x20;
            }
            else if (part.Length == 1 && char.IsLetterOrDigit(part[0]))
            {
                key = char.ToUpperInvariant(part[0]);
            }
        }

        return key is null ? fallback : new KeyboardShortcut(ctrl, alt, shift, key.Value);
    }

    public bool Matches(int vkCode)
    {
        const int vkControl = 0x11;
        const int vkAlt = 0x12;
        const int vkShift = 0x10;

        var ctrl = (NativeMethods.GetKeyState(vkControl) & 0x8000) != 0;
        var alt = (NativeMethods.GetKeyState(vkAlt) & 0x8000) != 0;
        var shift = (NativeMethods.GetKeyState(vkShift) & 0x8000) != 0;

        return vkCode == VirtualKey && ctrl == Ctrl && alt == Alt && shift == Shift;
    }
}
