param(
    [ValidateSet("Debug", "Release")]
    [string]$Configuration = "Release",
    [string]$Runtime = "win-x64"
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
