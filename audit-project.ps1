# APULINK PROJECT AUDIT SCRIPT
# Run this from your Apulink root directory
# It will create a comprehensive audit report

Write-Host "🔍 APULINK PROJECT AUDIT STARTING..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Create audit report file with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$auditFile = "APULINK_AUDIT_$timestamp.md"

# Start the audit report
@"
# APULINK PROJECT AUDIT REPORT
Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Machine: $env:COMPUTERNAME
Directory: $(Get-Location)

## PROJECT OVERVIEW
"@ | Out-File $auditFile

# 1. Check Git Status
Write-Host "`n📊 Checking Git Status..." -ForegroundColor Yellow
@"

## GIT STATUS
``````
$(git status 2>&1)
``````

### Current Branch
$(git branch --show-current)

### Recent Commits
``````
$(git log --oneline -10 2>&1)
``````
"@ | Out-File $auditFile -Append

# 2. Project Structure
Write-Host "📁 Analyzing Project Structure..." -ForegroundColor Yellow
@"

## PROJECT STRUCTURE

### Root Files
$(Get-ChildItem -File | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize | Out-String)

### Key Directories
"@ | Out-File $auditFile -Append

# List main directories
$mainDirs = @('app', 'components', 'lib', 'public', 'types', 'contexts', 'docs')
foreach ($dir in $mainDirs) {
    if (Test-Path $dir) {
        $count = (Get-ChildItem -Path $dir -Recurse -File).Count
        "- **$dir/**: $count files" | Out-File $auditFile -Append
    }
}

# 3. Key Configuration Files
Write-Host "⚙️ Checking Configuration Files..." -ForegroundColor Yellow
@"

## CONFIGURATION FILES

### package.json Dependencies
"@ | Out-File $auditFile -Append

if (Test-Path "package.json") {
    $package = Get-Content "package.json" | ConvertFrom-Json
    @"
**Project Name:** $($package.name)
**Version:** $($package.version)

**Key Dependencies:**
$(($package.dependencies | Get-Member -MemberType NoteProperty | ForEach-Object { "- $($_.Name): $($package.dependencies.$($_.Name))" }) -join "`n")
"@ | Out-File $auditFile -Append
}

# 4. Environment Variables Check
Write-Host "🔐 Checking Environment Variables..." -ForegroundColor Yellow
@"

## ENVIRONMENT VARIABLES

### .env.local Status
"@ | Out-File $auditFile -Append

if (Test-Path ".env.local") {
    $envVars = Get-Content ".env.local" | Where-Object { $_ -match "^[^#].*=" } | ForEach-Object { $_.Split('=')[0] }
    "Found $(($envVars).Count) environment variables:" | Out-File $auditFile -Append
    $envVars | ForEach-Object { "- $_" } | Out-File $auditFile -Append
} else {
    "⚠️ .env.local NOT FOUND!" | Out-File $auditFile -Append
}

# 5. App Directory Structure
Write-Host "🏗️ Analyzing App Directory..." -ForegroundColor Yellow
@"

## APP DIRECTORY STRUCTURE

### Routes Found
"@ | Out-File $auditFile -Append

$routes = Get-ChildItem -Path "app" -Recurse -Filter "page.tsx" | ForEach-Object {
    $route = $_.DirectoryName.Replace((Get-Location).Path, '').Replace('\app', '').Replace('\', '/')
    if ($route -eq '') { $route = '/' }
    "- `$route` → $($_.FullName.Replace((Get-Location).Path, '.'))"
}
$routes | Out-File $auditFile -Append

# 6. Component Analysis
Write-Host "🧩 Analyzing Components..." -ForegroundColor Yellow
@"

## COMPONENTS INVENTORY

### Dashboard Components (app/my-apulink/components)
"@ | Out-File $auditFile -Append

if (Test-Path "app/my-apulink/components") {
    Get-ChildItem -Path "app/my-apulink/components" -Filter "*.tsx" | ForEach-Object {
        $lines = (Get-Content $_.FullName).Count
        "- **$($_.Name)**: $lines lines"
    } | Out-File $auditFile -Append
}

# 7. Database Schema Check
Write-Host "🗄️ Checking Database References..." -ForegroundColor Yellow
@"

## DATABASE REFERENCES

### Supabase Table References
"@ | Out-File $auditFile -Append

$tables = @()
Get-ChildItem -Path . -Recurse -Include "*.ts","*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $matches = [regex]::Matches($content, "from\(['`""](\w+)['`""]")
    foreach ($match in $matches) {
        $tables += $match.Groups[1].Value
    }
}
$uniqueTables = $tables | Sort-Object -Unique
"Found references to $($uniqueTables.Count) tables:" | Out-File $auditFile -Append
$uniqueTables | ForEach-Object { "- $_" } | Out-File $auditFile -Append

# 8. API Routes
Write-Host "🌐 Finding API Routes..." -ForegroundColor Yellow
@"

## API ROUTES
"@ | Out-File $auditFile -Append

if (Test-Path "app/api") {
    Get-ChildItem -Path "app/api" -Recurse -Filter "route.ts" | ForEach-Object {
        $apiPath = $_.DirectoryName.Replace((Get-Location).Path, '').Replace('\', '/')
        "- `$apiPath`"
    } | Out-File $auditFile -Append
}

# 9. Recent Issues
Write-Host "⚠️ Checking for Known Issues..." -ForegroundColor Yellow
@"

## KNOWN ISSUES & TODOS

### TypeScript Errors Check
``````
$(npm run type-check 2>&1 | Select-String -Pattern "error" -Context 0,2)
``````

### TODO Comments in Code
"@ | Out-File $auditFile -Append

$todos = Get-ChildItem -Path . -Recurse -Include "*.ts","*.tsx","*.js","*.jsx" | 
    Select-String -Pattern "TODO|FIXME|HACK|BUG" | 
    Select-Object -First 10

if ($todos) {
    $todos | ForEach-Object { "- $($_.Filename):$($_.LineNumber) - $($_.Line.Trim())" } | Out-File $auditFile -Append
}

# 10. File Size Analysis
Write-Host "📊 Analyzing File Sizes..." -ForegroundColor Yellow
@"

## LARGE FILES (>50KB)
"@ | Out-File $auditFile -Append

Get-ChildItem -Path . -Recurse -File | 
    Where-Object { $_.Length -gt 50KB -and $_.Extension -match '\.(tsx?|jsx?|css|md)$' } |
    Sort-Object Length -Descending |
    Select-Object -First 10 |
    ForEach-Object { "- $($_.FullName.Replace((Get-Location).Path, '.')): $([math]::Round($_.Length/1KB, 1))KB" } |
    Out-File $auditFile -Append

# Summary
Write-Host "`n✅ Audit Complete!" -ForegroundColor Green
@"

## SUMMARY

### Quick Stats
- Total Files: $(Get-ChildItem -Recurse -File | Measure-Object | Select-Object -ExpandProperty Count)
- Total Directories: $(Get-ChildItem -Recurse -Directory | Measure-Object | Select-Object -ExpandProperty Count)
- TypeScript/TSX Files: $(Get-ChildItem -Recurse -Include "*.ts","*.tsx" | Measure-Object | Select-Object -ExpandProperty Count)
- Total Project Size: $([math]::Round((Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB, 2))MB

### Last Modified Files
$(Get-ChildItem -Recurse -File | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | ForEach-Object { "- $($_.Name) - $($_.LastWriteTime)" })

---
Audit generated by PowerShell script
"@ | Out-File $auditFile -Append

Write-Host "📄 Audit report saved to: $auditFile" -ForegroundColor Green
Write-Host "`nOpening audit report..." -ForegroundColor Cyan

# Open the report
Start-Process notepad $auditFile