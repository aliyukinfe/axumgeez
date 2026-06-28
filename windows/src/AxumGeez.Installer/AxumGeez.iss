; Axum Geez installer script for Inno Setup 6.
; Build after publishing the app:
;   dotnet publish ..\AxumGeez.App\AxumGeez.App.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o ..\..\artifacts\publish\win-x64
;   iscc AxumGeez.iss

#define MyAppName "Axum Geez"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Axum Geez"
#define PublishDir "..\..\artifacts\publish\win-x64"
#define IconFile "..\AxumGeez.App\Assets\AxumGeez.ico"

[Setup]
AppId={{A51B1277-17B4-4E91-9505-E7288E9851AB}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\Axum Geez
DefaultGroupName=Axum Geez
AllowNoIcons=yes
OutputDir=..\..\artifacts\installer
OutputBaseFilename=AxumGeezSetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=lowest
UninstallDisplayName=Axum Geez
SetupIconFile={#IconFile}
UninstallDisplayIcon={app}\AxumGeez.exe

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"; Flags: unchecked
Name: "autostart"; Description: "Start Axum Geez with Windows"; GroupDescription: "Startup:"

[Files]
Source: "{#PublishDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Axum Geez"; Filename: "{app}\AxumGeez.exe"; IconFilename: "{app}\AxumGeez.exe"
Name: "{autodesktop}\Axum Geez"; Filename: "{app}\AxumGeez.exe"; IconFilename: "{app}\AxumGeez.exe"; Tasks: desktopicon

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "Axum Geez"; ValueData: """{app}\AxumGeez.exe"""; Tasks: autostart

[Run]
Filename: "{app}\AxumGeez.exe"; Description: "Launch Axum Geez"; Flags: nowait postinstall skipifsilent
