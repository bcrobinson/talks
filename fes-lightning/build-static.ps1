$ErrorActionPreference = 'stop';

$staticDir = '.\static\'
$githubIoDir = 'C:\repos\bcrobinson.github.io\fes-2019-07\'

$files = @(
    '.\index.html',
    '.\js\',
    '.\css\',
    '.\plugin\',
    '.\lib\'
)

if (Test-Path $staticDir) {
    Write-Warning "Clean: $staticDir";
    Remove-Item $staticDir -Recurse -Force;
}

$null = New-Item 'static' -ItemType Dir
$staticDir = Resolve-Path $staticDir |% Path;

$files | Copy-Item -Destination $staticDir -Recurse -Verbose

if ((Test-Path $githubIoDir)) {
    Write-Warning "Clean: $githubIoDir";
    Remove-Item $githubIoDir -Recurse -Force;
}

$null = New-Item $githubIoDir -ItemType Dir;

Get-ChildItem $staticDir | Copy-Item -Destination $githubIoDir -Recurse -Verbose;
