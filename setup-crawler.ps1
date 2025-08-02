# setup-crawler.ps1
# Quick setup script for the professional crawler

Write-Host "Setting up InvestInPuglia Professional Crawler" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Create directory structure
$dirs = @(
    "scripts\professional-crawler"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# Navigate to crawler directory
Set-Location "scripts\professional-crawler"

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Return to root
Set-Location ..\..\

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure your .env.local has RESEND_API_KEY" -ForegroundColor White
Write-Host "2. Run the crawler with: .\run-crawler.ps1" -ForegroundColor White