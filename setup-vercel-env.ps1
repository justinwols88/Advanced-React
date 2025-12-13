# Simple script to add environment variables to Vercel
# Run: .\setup-vercel-env.ps1

Write-Host "`n=== Copy and paste these commands one by one ===" -ForegroundColor Cyan
Write-Host ""

# Read .env.production and generate commands
Get-Content .env.production | Where-Object { $_ -match '^VITE_' } | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $key = $matches[1]
        $value = $matches[2]
        Write-Host "vercel env add $key production" -ForegroundColor Yellow
        Write-Host "# When prompted, paste: $value" -ForegroundColor Gray
        Write-Host ""
    }
}

Write-Host "`nOr use the Vercel Dashboard:" -ForegroundColor Cyan
Write-Host "https://vercel.com/dashboard → Your Project → Settings → Environment Variables`n" -ForegroundColor White
