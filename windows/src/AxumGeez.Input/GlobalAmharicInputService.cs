using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using AxumGeez.Core;

namespace AxumGeez.Input;

public sealed class GlobalAmharicInputService : IDisposable
{
    private readonly FidelMap _map;
    private readonly UnicodeSender _sender;
    private readonly NativeMethods.LowLevelKeyboardProc _proc;
    private readonly object _gate = new();
    private nint _hookId;
    private string _pending = "";
    private int _pendingCommittedLength;
    private bool _isSending;
    private TransliterationSettings _settings = TransliterationSettings.Default;
    private KeyboardShortcut _primaryShortcut = KeyboardShortcut.CtrlSpace;
    private KeyboardShortcut _alternateShortcut = KeyboardShortcut.AltShiftA;

    public GlobalAmharicInputService(FidelMap? map = null, UnicodeSender? sender = null)
    {
        _map = map ?? FidelMap.Default;
        _sender = sender ?? new UnicodeSender();
        _proc = HookCallback;
    }

    public InputMode Mode { get; private set; } = InputMode.Amharic;
    public bool IsRunning => _hookId != nint.Zero;

    public event EventHandler<ModeChangedEventArgs>? ModeChanged;

    public void Start()
    {
        if (_hookId != nint.Zero)
        {
            return;
        }

        _hookId = NativeMethods.SetWindowsHookEx(
            NativeMethods.WH_KEYBOARD_LL,
            _proc,
            nint.Zero,
            0);

        InputDiagnostics.Write(_hookId == nint.Zero
            ? $"hook start failed error={Marshal.GetLastWin32Error()}"
            : $"hook started id={_hookId}");
    }

    public void Stop()
    {
        if (_hookId == nint.Zero)
        {
            return;
        }

        NativeMethods.UnhookWindowsHookEx(_hookId);
        _hookId = nint.Zero;
    }

    public void ApplySettings(TransliterationSettings settings)
    {
        _settings = settings;
    }

    public void ConfigureShortcuts(string? primary, string? alternate)
    {
        _primaryShortcut = KeyboardShortcut.ParseOrDefault(primary, KeyboardShortcut.CtrlSpace);
        _alternateShortcut = KeyboardShortcut.ParseOrDefault(alternate, KeyboardShortcut.AltShiftA);
    }

    public void SetMode(InputMode mode)
    {
        if (Mode == mode)
        {
            return;
        }

        FlushPending();
        Mode = mode;
        ModeChanged?.Invoke(this, new ModeChangedEventArgs(mode));
    }

    public void ToggleMode() => SetMode(Mode == InputMode.Amharic ? InputMode.English : InputMode.Amharic);

    private nint HookCallback(int nCode, nint wParam, nint lParam)
    {
        try
        {
            return HookCallbackCore(nCode, wParam, lParam);
        }
        catch
        {
            _pending = "";
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }
    }

    private nint HookCallbackCore(int nCode, nint wParam, nint lParam)
    {
        if (nCode < 0 || _isSending)
        {
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        var isKeyDown = wParam == NativeMethods.WM_KEYDOWN || wParam == NativeMethods.WM_SYSKEYDOWN;
        if (!isKeyDown)
        {
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        var hook = Marshal.PtrToStructure<NativeMethods.KbdLlHookStruct>(lParam);
        if ((hook.Flags & NativeMethods.LLKHF_INJECTED) != 0 || hook.VkCode == NativeMethods.VK_PACKET)
        {
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        if (IsToggleShortcut((int)hook.VkCode))
        {
            ToggleMode();
            InputDiagnostics.Write($"mode toggled {Mode}");
            return 1;
        }

        if (Mode == InputMode.English)
        {
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        var character = TryGetCharacter(hook.VkCode, hook.ScanCode);
        InputDiagnostics.Write($"key vk={hook.VkCode} scan={hook.ScanCode} char={character?.ToString() ?? "<null>"} mode={Mode}");
        if (character is null)
        {
            FlushPending();
            return NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        return HandleCharacter(character.Value)
            ? 1
            : NativeMethods.CallNextHookEx(_hookId, nCode, wParam, lParam);
    }

    private bool HandleCharacter(char character)
    {
        lock (_gate)
        {
            if (char.IsLetterOrDigit(character))
            {
                var candidate = _pending + character;
                var result = _map.Lookup(candidate, _settings);
                if (result.State == TransliterationState.ExactAndPartial && result.Output is not null)
                {
                    InputDiagnostics.Write($"replace exact-partial {candidate}->{result.Output}");
                    ReplacePending(candidate, result.Output);
                    return true;
                }

                if (result.State == TransliterationState.Exact && result.Output is not null)
                {
                    InputDiagnostics.Write($"replace exact {candidate}->{result.Output}");
                    ReplacePending(candidate, result.Output);
                    _pending = "";
                    _pendingCommittedLength = 0;
                    return true;
                }

                if (result.State == TransliterationState.Partial)
                {
                    InputDiagnostics.Write($"pending partial {candidate}");
                    _pending = candidate;
                    return true;
                }

                if (_pending.Length > 0)
                {
                    InputDiagnostics.Write($"flush before no-match pending={_pending} next={character}");
                    if (_pendingCommittedLength == 0)
                    {
                        var pendingResult = _map.Lookup(_pending, _settings);
                        Commit(pendingResult.Output ?? _pending);
                    }

                    _pending = "";
                    _pendingCommittedLength = 0;
                    return HandleCharacter(character);
                }

                return false;
            }

            var punctuation = _map.Lookup(character.ToString(), _settings);
            if (_pending.Length > 0)
            {
                if (_pendingCommittedLength == 0)
                {
                    var pendingResult = _map.Lookup(_pending, _settings);
                    Commit(pendingResult.Output ?? _pending);
                }

                _pending = "";
                _pendingCommittedLength = 0;
            }

            if (punctuation.Output is not null)
            {
                Commit(punctuation.Output);
                return true;
            }

            return false;
        }
    }

    private void FlushPending()
    {
        lock (_gate)
        {
            if (_pending.Length == 0)
            {
                return;
            }

            var result = _map.Lookup(_pending, _settings);
            if (_pendingCommittedLength == 0)
            {
                Commit(result.Output ?? _pending);
            }

            _pending = "";
            _pendingCommittedLength = 0;
        }
    }

    private void ReplacePending(string pending, string text)
    {
        _isSending = true;
        try
        {
            if (_pendingCommittedLength > 0)
            {
                _sender.SendBackspaces(_pendingCommittedLength);
            }

            _sender.SendText(text);
            _pending = pending;
            _pendingCommittedLength = text.Length;
        }
        finally
        {
            _isSending = false;
        }
    }

    private void Commit(string text)
    {
        _isSending = true;
        try
        {
            _sender.SendText(text);
        }
        finally
        {
            _isSending = false;
        }
    }

    private bool IsToggleShortcut(int vkCode) =>
        _primaryShortcut.Matches(vkCode) || _alternateShortcut.Matches(vkCode);

    private static char? TryGetCharacter(uint vkCode, uint scanCode)
    {
        if (vkCode is >= 0x41 and <= 0x5A)
        {
            var shiftDown = (NativeMethods.GetKeyState(NativeMethods.VK_SHIFT) & 0x8000) != 0;
            var capsOn = (NativeMethods.GetKeyState(NativeMethods.VK_CAPITAL) & 0x0001) != 0;
            var uppercase = shiftDown ^ capsOn;
            return uppercase ? (char)vkCode : (char)('a' + (vkCode - 0x41));
        }

        if (vkCode is >= 0x30 and <= 0x39)
        {
            return (char)vkCode;
        }

        return vkCode switch
        {
            0xBA => ';',
            0xBC => ',',
            0xBE => '.',
            0xBF => '?',
            _ => TryGetCharacterFromKeyboardState(vkCode, scanCode)
        };
    }

    private static char? TryGetCharacterFromKeyboardState(uint vkCode, uint scanCode)
    {
        var keyboardState = new byte[256];
        if (!NativeMethods.GetKeyboardState(keyboardState))
        {
            return null;
        }

        var buffer = new StringBuilder(8);
        var layout = NativeMethods.GetKeyboardLayout(0);
        var result = NativeMethods.ToUnicodeEx(vkCode, scanCode, keyboardState, buffer, buffer.Capacity, 0, layout);
        return result == 1 && buffer.Length > 0 && !char.IsControl(buffer[0]) ? buffer[0] : null;
    }

    public void Dispose()
    {
        Stop();
        GC.SuppressFinalize(this);
    }
}
