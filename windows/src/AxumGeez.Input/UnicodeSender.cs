using System.Runtime.InteropServices;

namespace AxumGeez.Input;

public sealed class UnicodeSender
{
    public void SendBackspaces(int count)
    {
        for (var i = 0; i < count; i++)
        {
            var sent = SendVirtualKey(NativeMethods.VK_BACK);
            InputDiagnostics.Write($"send backspace sent={sent}");
        }
    }

    public void SendText(string text)
    {
        foreach (var ch in text)
        {
            var sent = SendUnicode(ch);
            InputDiagnostics.Write($"send unicode U+{(int)ch:X4} sent={sent}");
        }
    }

    private static uint SendVirtualKey(ushort key)
    {
        var inputs = new[]
        {
            new NativeMethods.INPUT
            {
                type = NativeMethods.INPUT_KEYBOARD,
                U = new NativeMethods.InputUnion { ki = new NativeMethods.KEYBDINPUT { wVk = key } }
            },
            new NativeMethods.INPUT
            {
                type = NativeMethods.INPUT_KEYBOARD,
                U = new NativeMethods.InputUnion { ki = new NativeMethods.KEYBDINPUT { wVk = key, dwFlags = NativeMethods.KEYEVENTF_KEYUP } }
            }
        };
        return NativeMethods.SendInput((uint)inputs.Length, inputs, Marshal.SizeOf<NativeMethods.INPUT>());
    }

    private static uint SendUnicode(char ch)
    {
        var inputs = new[]
        {
            new NativeMethods.INPUT
            {
                type = NativeMethods.INPUT_KEYBOARD,
                U = new NativeMethods.InputUnion
                {
                    ki = new NativeMethods.KEYBDINPUT { wScan = ch, dwFlags = NativeMethods.KEYEVENTF_UNICODE }
                }
            },
            new NativeMethods.INPUT
            {
                type = NativeMethods.INPUT_KEYBOARD,
                U = new NativeMethods.InputUnion
                {
                    ki = new NativeMethods.KEYBDINPUT { wScan = ch, dwFlags = NativeMethods.KEYEVENTF_UNICODE | NativeMethods.KEYEVENTF_KEYUP }
                }
            }
        };
        return NativeMethods.SendInput((uint)inputs.Length, inputs, Marshal.SizeOf<NativeMethods.INPUT>());
    }
}
