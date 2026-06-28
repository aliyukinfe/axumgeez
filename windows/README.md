# Axum Geez

Axum Geez is a Windows 10/11 Amharic and Geez typing tool. It runs in the tray, provides a small floating toolbar, and uses a global keyboard hook MVP to transliterate Latin input into Ethiopic fidels across normal Windows text fields.

This first version is structured so the global-hook implementation in `AxumGeez.Input` can later be replaced by a full Windows Text Services Framework IME without changing the core mapping engine or UI.

## Projects

- `src/AxumGeez.Core` - transliteration engine, fidel mapping, punctuation and numeral conversion.
- `src/AxumGeez.Input` - Windows global keyboard hook and Unicode text sending.
- `src/AxumGeez.App` - WPF tray app, floating toolbar, settings, help/layout, toast.
- `src/AxumGeez.Installer` - Inno Setup installer script.
- `tests/AxumGeez.Tests` - xUnit tests for mappings and examples.

## Build

Install prerequisites:

- .NET 8 SDK
- Inno Setup 6, optional, for the installer

Run:

```powershell
.\build.ps1 -Configuration Release
```

The published app is written to:

```text
artifacts\publish\win-x64
```

## Installer

After publishing:

```powershell
cd src\AxumGeez.Installer
iscc AxumGeez.iss
```

The installer is written to:

```text
artifacts\installer\AxumGeezSetup.exe
```

The installer creates Start Menu and optional desktop shortcuts, supports optional startup registration, and includes a normal Windows uninstaller.

## Typing

Launch Axum Geez, place the cursor in any normal Windows text field, and type Latin keys. Examples:

```text
ha  -> ሀ
hu  -> ሁ
hi  -> ሂ
haa -> ሃ
he  -> ሄ
h   -> ህ
ho  -> ሆ
sh  -> ሽ
ch  -> ች
ts  -> ጽ
zh  -> ዥ
gn  -> ኘ
gnu -> ኙ
gnn -> ኝ
g40 -> ፵
g10000 -> ፼
q   -> ቅ
x   -> ኽ
kh  -> ኽ
```

Punctuation:

```text
. -> ።
, -> ፣
; -> ፤
: -> ፥
? -> ?
```

Shortcuts:

```text
Ctrl+Space
Alt+Shift+A
```

Both shortcuts toggle between `አማ` and `EN`.

## Test In Real Apps

1. Start `AxumGeez.exe`.
2. Confirm the tray icon appears and the floating toolbar shows `አማ`.
3. Open Notepad and type `selam`, then press Space. You should see `ሰላም`.
4. Open Microsoft Word and type `ha hu hi haa he h ho`.
5. Open Excel, select a cell, type `amesegenallo`, then press Space.
6. Open Chrome and type into the address bar or a website search box.
7. Open VS Code and type into a normal editor tab. Toggle to English mode before writing code.
8. Use `Ctrl+Space` or `Alt+Shift+A` to switch modes. A toast appears each time.

## Privacy

Axum Geez works offline. It has no ads, no telemetry, no accounts, and no network dependency.

## Notes

The global hook MVP is intended for normal desktop text fields and editors. Some elevated apps or protected credential fields may reject synthetic input by Windows design. For those scenarios, the planned production-grade path is a TSF IME provider using the same `AxumGeez.Core` engine.

## Keyboard Layout Notes

- The ኘ family uses GN keys: `gn`, `gnu`, `gni`, `gna`, `gne`, `gnn`, `gno`.
- The old NY keys are not the default layout.
- Ge'ez numbers use dedicated shortcuts: `g1` through `g9`, `g10`, `g20` through `g90`, `g100`, and `g10000`.
- Normal number-row keys remain `1 2 3 4 5 6 7 8 9 0`.
