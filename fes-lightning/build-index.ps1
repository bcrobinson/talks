$ErrorActionPreference = 'stop';

$indexPath = Resolve-Path ".\index.html" |% path;

$slidesHtml = `
    Get-ChildItem .\slides\*.md `
    |% {
        Write-Host "Found slide: $($_.FullName)";
        $content = Get-Content $_ -Raw;

        $htmlContent = @"
        <section>
$content
        </section>
"@
        Write-Output $htmlContent;
    } `
    | Out-String;

$indexHtml = Get-Content $indexPath -Raw;

# Write-Host "Slide Html:`----------------`n$slidesHtml`n----------------";

#Write-Host "Original:`----------------`n$indexHtml`n----------------";

$startToken = '<!--slides/-->';
$endToken = '<!--/slides-->';
$startIdx = $indexHtml.IndexOf($startToken);
$endIdx = $indexHtml.IndexOf($endToken);

$startHtml = $indexHtml.Substring(0, $startIdx);
$endHtml = $indexHtml.Substring($endIdx + $endToken.Length);

$indexHtml = $startHtml + $startToken + "`n" + $slidesHtml + "`n" + $endToken + $endHtml;

#Write-Host "Updated:`n----------------`n$indexHtml`n----------------`n";

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllLines($indexPath, $indexHtml, $Utf8NoBomEncoding);
