# run-crawler.ps1
# PowerShell script to run the professional crawler on Windows

Write-Host "InvestInPuglia Professional Crawler" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Navigate to crawler directory
$crawlerPath = Join-Path $PSScriptRoot "scripts\professional-crawler"
if (-not (Test-Path $crawlerPath)) {
    Write-Host "Crawler directory not found at: $crawlerPath" -ForegroundColor Red
    exit 1
}

Set-Location $crawlerPath
Write-Host "Working directory: $crawlerPath" -ForegroundColor Yellow

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Menu
Write-Host ""
Write-Host "CRAWLER OPTIONS:" -ForegroundColor Cyan
Write-Host "1. Run Full Crawler (Find and Save Professionals)" -ForegroundColor White
Write-Host "2. Send Email Invitations" -ForegroundColor White
Write-Host "3. Test Mode (Crawl 1 City Only)" -ForegroundColor White
Write-Host "4. View CSV Results" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White

$choice = Read-Host "Select option (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Starting full crawler..." -ForegroundColor Green
        Write-Host "This will search all categories in all Puglia cities." -ForegroundColor Yellow
        Write-Host "Estimated time: 30-60 minutes" -ForegroundColor Yellow
        
        $confirm = Read-Host "Continue? (y/n)"
        if ($confirm -eq "y") {
            node crawler.js
        }
    }
    "2" {
        Write-Host ""
        Write-Host "Starting email invitation campaign..." -ForegroundColor Green
        Write-Host "This will send invitations to all pending professionals." -ForegroundColor Yellow
        
        $confirm = Read-Host "Continue? (y/n)"
        if ($confirm -eq "y") {
            node email-sender.js
        }
    }
    "3" {
        Write-Host ""
        Write-Host "Starting test mode..." -ForegroundColor Green
        Write-Host "This will only crawl Lecce for testing." -ForegroundColor Yellow
        node crawler.js --test
    }
    "4" {
        if (Test-Path "professionals.csv") {
            Write-Host ""
            Write-Host "Opening CSV results..." -ForegroundColor Green
            Start-Process "professionals.csv"
        } else {
            Write-Host "No CSV file found. Run the crawler first." -ForegroundColor Red
        }
    }
    "5" {
        Write-Host ""
        Write-Host "Goodbye!" -ForegroundColor Green
        exit 0
    }
    default {
        Write-Host "Invalid option" -ForegroundColor Red
    }
}

# Return to original directory
Set-Location $PSScriptRoot
Write-Host ""
Write-Host "Done!" -ForegroundColor Green