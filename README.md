# AxumGeez

AxumGeez is open-source Amharic and Geez typing software for Windows, plus the official public website at [axumgeez.adischat.com](https://axumgeez.adischat.com).

The Windows app converts Latin keyboard input into Unicode Ethiopic fidels so users can type Amharic in Word, Excel, browsers, websites, chat apps, VS Code, and normal Windows text fields.

## Repository Structure

- `app`, `components`, `lib`, `public` - Next.js website.
- `windows` - C#/.NET 8 WPF Windows typing app, transliteration engine, input hook, tests, and Inno Setup script.
- `LICENSE` - MIT License.
- `CONTRIBUTING.md` - contribution guide.
- `SECURITY.md` - security reporting policy.
- `OPEN_SOURCE.md` - open-source project notes.

## Website

The website uses Next.js 14 App Router, React, TypeScript, and Tailwind CSS.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run lint
npm run build
```

## Windows App

Requirements:

- Windows 10 or Windows 11
- .NET 8 SDK
- Inno Setup 6, optional for installer builds

Build and test:

```powershell
cd windows
dotnet restore
dotnet test
```

Build release installer:

```powershell
cd windows
.\build.ps1 -Configuration Release
```

## Download Package

Current website package URL:

```text
https://axumgeez.adischat.com/downloads/1.0.1/AxumGeezSetup.exe
```

After Microsoft Store approval, set this environment variable in Vercel:

```env
NEXT_PUBLIC_MICROSOFT_STORE_URL=https://apps.microsoft.com/detail/YOUR_PRODUCT_ID
```

## Open Source License

AxumGeez is licensed under the MIT License.

Private signing certificates, service credentials, generated artifacts, and local development settings must not be committed.
