# Contributing to AxumGeez

Thank you for helping improve AxumGeez. This project exists to make Amharic and Geez typing easier on Windows.

## Development Setup

### Website

```powershell
npm install
npm run dev
```

### Windows App

```powershell
cd windows
dotnet restore
dotnet test
```

To build the Windows installer, install Inno Setup 6 and run:

```powershell
cd windows
.\build.ps1
```

## Contribution Guidelines

- Keep changes focused and easy to review.
- Add or update tests for typing engine behavior.
- Do not commit generated build output such as `bin`, `obj`, `.next`, installers, or local secrets.
- Keep Amharic keyboard layout changes documented in both the app and website.
- Use clear issue and pull request descriptions.

## Code Style

- C# uses the existing .NET style in the Windows app.
- Website code uses TypeScript, React, Next.js App Router, and Tailwind CSS.
- Prefer readable implementation over clever shortcuts.

## Reporting Issues

Please include:

- Windows version
- AxumGeez version
- App where typing failed, if relevant
- Exact keys typed and expected output
- Screenshots only when they help explain the issue
