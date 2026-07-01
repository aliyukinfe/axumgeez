param(
    [string]$InstallerPath = ".\public\downloads\1.0.1\AxumGeezSetup.exe",
    [string]$InstallArgs = '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP-',
    [string]$ExpectedDisplayName = "Axum Geez",
    [string]$ExpectedPublisher = "AdisTech Solutions",
    [string]$ExpectedVersion = "1.0.1"
)

$ErrorActionPreference = "Stop"
$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure([string]$message) {
    $script:failures.Add($message)
    Write-Host "FAIL: $message" -ForegroundColor Red
}

function Add-Pass([string]$message) {
    Write-Host "PASS: $message" -ForegroundColor Green
}

if (-not (Test-Path -LiteralPath $InstallerPath)) {
    Add-Failure "Installer not found: $InstallerPath"
} else {
    Add-Pass "Installer exists: $InstallerPath"
    $principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Add-Failure "Run this script from an elevated PowerShell session because the Store installer uses normal per-machine elevation."
        Write-Host ""
        Write-Host "Store package verification FAILED with $($failures.Count) issue(s)." -ForegroundColor Red
        exit 1
    }
    $process = Start-Process -FilePath (Resolve-Path -LiteralPath $InstallerPath) -ArgumentList $InstallArgs -Wait -PassThru
    if ($process.ExitCode -eq 0) {
        Add-Pass "Silent install exit code is 0"
    } else {
        Add-Failure "Silent install exit code was $($process.ExitCode)"
    }
}

$uninstallRoots = @(
    "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall",
    "HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall",
    "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall"
)

$entry = $null
foreach ($root in $uninstallRoots) {
    if (-not (Test-Path $root)) {
        continue
    }

    $entry = Get-ChildItem $root |
        ForEach-Object { Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue } |
        Where-Object { $_.DisplayName -eq $ExpectedDisplayName } |
        Select-Object -First 1

    if ($entry) {
        break
    }
}

if (-not $entry) {
    Add-Failure "Installed Apps registry entry was not found for $ExpectedDisplayName"
} else {
    Add-Pass "Installed Apps registry entry found"

    if ($entry.DisplayName -eq $ExpectedDisplayName) { Add-Pass "DisplayName is $ExpectedDisplayName" } else { Add-Failure "DisplayName was '$($entry.DisplayName)'" }
    if ($entry.Publisher -eq $ExpectedPublisher) { Add-Pass "Publisher is $ExpectedPublisher" } else { Add-Failure "Publisher was '$($entry.Publisher)'" }
    if ($entry.DisplayVersion -eq $ExpectedVersion) { Add-Pass "DisplayVersion is $ExpectedVersion" } else { Add-Failure "DisplayVersion was '$($entry.DisplayVersion)'" }
    if ($entry.UninstallString) { Add-Pass "UninstallString exists" } else { Add-Failure "UninstallString is missing" }

    $installLocation = $entry.InstallLocation
    if ($installLocation -and (Test-Path -LiteralPath $installLocation)) {
        Add-Pass "InstallLocation exists: $installLocation"
        $appExe = Join-Path $installLocation "AxumGeez.exe"
        if (Test-Path -LiteralPath $appExe) { Add-Pass "App executable exists" } else { Add-Failure "App executable missing: $appExe" }
    } else {
        Add-Failure "InstallLocation is missing or does not exist"
    }
}

if ($failures.Count -gt 0) {
    Write-Host ""
    Write-Host "Store package verification FAILED with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Store package verification PASSED." -ForegroundColor Green
exit 0
