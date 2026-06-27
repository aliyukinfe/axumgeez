# AxumGeez Website

Modern landing website for AxumGeez, built with Next.js 14 App Router, React, TypeScript, and Tailwind CSS.

## Pages

- `/` Home
- `/features`
- `/layout` Keyboard Layout with searchable main fidels, extended fidels, Ge'ez punctuation, and Ge'ez numbers
- `/download`
- `/support`
- `/privacy`
- `/terms`

The Keyboard Layout page includes GN mappings for the ኘ family and dedicated Ge'ez number shortcuts such as `g1`, `g40`, `g100`, and `g10000`.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run lint
npm run build
npm run start
```

## Download File

Place the Windows installer at:

```text
public/downloads/1.0.0/AxumGeezSetup.exe
```

The Partner Center package URL for version `1.0.0` is:

```text
https://axumgeez.adischat.com/downloads/1.0.0/AxumGeezSetup.exe
```

Set `NEXT_PUBLIC_MICROSOFT_STORE_URL` after the Microsoft Store listing is published. The Download page will then point to Microsoft Store instead of the direct installer.
