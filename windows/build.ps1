param(
    [ValidateSet("Debug", "Release")]
    [string]$Configuration = "Release",
    [string]$Runtime = "win-x64",
    [switch]$SkipInstaller
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$publishDir = Join-Path $root "artifacts\publish\$Runtime"

dotnet restore (Join-Path $root "AxumGeez.sln")
dotnet test (Join-Path $root "AxumGeez.sln") -c $Configuration --no-restore
if (Test-Path $publishDir) {
    Remove-Item -LiteralPath $publishDir -Recurse -Force
}
dotnet publish (Join-Path $root "src\AxumGeez.App\AxumGeez.App.csproj") `
    -c $Configuration `
    -r $Runtime `
    --self-contained true `
    -p:PublishSingleFile=true `
    -p:IncludeNativeLibrariesForSelfExtract=true `
    -o $publishDir

Write-Host "Published Axum Geez to $publishDir"

if (-not $SkipInstaller) {
    $isccCommand = Get-Command iscc -ErrorAction SilentlyContinue
    $iscc = if ($isccCommand) { $isccCommand.Source } else { $null }
    if (-not $iscc) {
        $isccCandidates = @(
            "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
            "$env:ProgramFiles\Inno Setup 6\ISCC.exe",
            "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe"
        )
        $iscc = $isccCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
    }

    if (-not $iscc) {
        throw "Inno Setup 6 compiler was not found. Install Inno Setup 6 or run with -SkipInstaller."
    }

    $installerScript = Join-Path $root "src\AxumGeez.Installer\AxumGeez.iss"
    & $iscc $installerScript
    if ($LASTEXITCODE -ne 0) {
        throw "Inno Setup failed with exit code $LASTEXITCODE."
    }

    Write-Host "Built installer at $(Join-Path $root 'artifacts\installer\AxumGeezSetup.exe')"
}
