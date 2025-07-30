# InvestInPuglia.eu Repository Audit Script
# This script generates a comprehensive audit of your project structure

# Set output file
$outputFile = "INVESTINPUGLIA_PROJECT_AUDIT.md"

# Start the audit
@"
# INVESTINPUGLIA.EU PROJECT AUDIT & ARCHITECTURE
Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## PROJECT OVERVIEW

**Project Name:** InvestInPuglia.eu
**Type:** [To be determined based on your project]
**Stack:** [To be determined from package.json]
**Status:** [Current development status]

## PLATFORM PURPOSE

[This section will be filled based on the actual project purpose]

## PROJECT STRUCTURE

"@ | Out-File -FilePath $outputFile -Encoding UTF8

# Scan the actual directory structure
Write-Host "`nScanning InvestInPuglia.eu project structure..." -ForegroundColor Cyan

# First, let's check if package.json exists to determine the stack
$packageJsonPath = "./package.json"
if (Test-Path $packageJsonPath) {
    Write-Host "Found package.json - analyzing dependencies..." -ForegroundColor Green
    $packageContent = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    
    Add-Content -Path $outputFile -Value "`n### DETECTED STACK`n"
    Add-Content -Path $outputFile -Value "**Framework:** $(if ($packageContent.dependencies.next) { 'Next.js ' + $packageContent.dependencies.next } elseif ($packageContent.dependencies.react) { 'React ' + $packageContent.dependencies.react } else { 'Unknown' })"
    Add-Content -Path $outputFile -Value "**Key Dependencies:**"
    
    # List major dependencies
    $majorDeps = @('react', 'next', 'typescript', 'tailwindcss', 'supabase', '@supabase/supabase-js', 'firebase', 'express', 'vue', 'angular', 'svelte')
    foreach ($dep in $majorDeps) {
        if ($packageContent.dependencies.$dep -or $packageContent.devDependencies.$dep) {
            $version = if ($packageContent.dependencies.$dep) { $packageContent.dependencies.$dep } else { $packageContent.devDependencies.$dep }
            Add-Content -Path $outputFile -Value "- $dep: $version"
        }
    }
}

# Get directory structure
Add-Content -Path $outputFile -Value "`n`n## DIRECTORY STRUCTURE`n``````"

# Get all directories
$directories = Get-ChildItem -Path . -Directory -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git|dist|build|out" } |
    Sort-Object FullName

foreach ($dir in $directories) {
    $relativePath = $dir.FullName.Replace($PWD.Path, "").TrimStart('\')
    Add-Content -Path $outputFile -Value $relativePath
}

Add-Content -Path $outputFile -Value "``````"

# Get important files
Write-Host "Scanning for important files..." -ForegroundColor Cyan

$importantFiles = Get-ChildItem -Path . -File -Recurse |
    Where-Object { 
        $_.Extension -in @('.tsx', '.ts', '.jsx', '.js', '.json', '.md', '.mdx', '.css', '.scss') -and
        $_.FullName -notmatch "node_modules|\.next|\.git|dist|build|out" -and
        $_.Name -notmatch "package-lock\.json"
    } |
    Select-Object -First 150 |
    Sort-Object FullName

Add-Content -Path $outputFile -Value "`n### KEY FILES:`n``````"

foreach ($file in $importantFiles) {
    $relativePath = $file.FullName.Replace($PWD.Path, "").TrimStart('\')
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Add-Content -Path $outputFile -Value "$relativePath - $sizeKB KB"
}

Add-Content -Path $outputFile -Value "``````"

# Create a tree view without special characters
Write-Host "Generating tree view..." -ForegroundColor Cyan

# Analyze project structure to create tree
$treeView = @"

## SIMPLIFIED TREE VIEW

``````
InvestInPuglia.eu/
"@

# Add main directories
$mainDirs = Get-ChildItem -Path . -Directory | 
    Where-Object { $_.Name -notmatch "node_modules|\.next|\.git|dist|build|out" } |
    Sort-Object Name

foreach ($dir in $mainDirs) {
    $treeView += "`n+-- $($dir.Name)/"
    
    # Add subdirectories (1 level deep)
    $subDirs = Get-ChildItem -Path $dir.FullName -Directory -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notmatch "node_modules|\.next|\.git" } |
        Select-Object -First 5
    
    foreach ($subDir in $subDirs) {
        $treeView += "`n    +-- $($subDir.Name)/"
    }
}

# Add main files
$mainFiles = Get-ChildItem -Path . -File |
    Where-Object { $_.Extension -in @('.json', '.js', '.ts', '.tsx', '.md', '.config.js', '.config.ts') } |
    Select-Object -First 10

foreach ($file in $mainFiles) {
    $treeView += "`n+-- $($file.Name)"
}

$treeView += "`n``````"

Add-Content -Path $outputFile -Value $treeView

# Detect project type and features
Write-Host "`nAnalyzing project features..." -ForegroundColor Cyan

Add-Content -Path $outputFile -Value "`n## DETECTED FEATURES`n"

# Check for common files/patterns
$features = @()

if (Test-Path "next.config.js" -or Test-Path "next.config.mjs") {
    $features += "- Next.js Application"
}
if (Test-Path "app" -Type Container) {
    $features += "- Next.js 13+ App Router"
}
if (Test-Path "pages" -Type Container) {
    $features += "- Next.js Pages Router"
}
if (Test-Path "tailwind.config.js" -or Test-Path "tailwind.config.ts") {
    $features += "- Tailwind CSS"
}
if (Test-Path "tsconfig.json") {
    $features += "- TypeScript"
}
if (Test-Path "supabase" -Type Container -or (Get-Content "package.json" -Raw -ErrorAction SilentlyContinue) -match "supabase") {
    $features += "- Supabase Integration"
}
if (Test-Path "prisma" -Type Container) {
    $features += "- Prisma ORM"
}
if (Test-Path ".env.local" -or Test-Path ".env") {
    $features += "- Environment Variables Configured"
}
if (Test-Path "public" -Type Container) {
    $features += "- Static Assets Directory"
}
if (Test-Path "components" -Type Container -or Test-Path "src/components" -Type Container) {
    $features += "- Component-based Architecture"
}

foreach ($feature in $features) {
    Add-Content -Path $outputFile -Value $feature
}

# Add quick start section
$quickStart = @"

## QUICK START COMMANDS

``````bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type checking (if TypeScript)
npm run type-check

# Linting
npm run lint
``````

## COMMON FILE LOCATIONS

- **Homepage:** app/page.tsx or pages/index.tsx
- **Components:** components/ or app/components/
- **API Routes:** app/api/ or pages/api/
- **Styles:** app/globals.css or styles/
- **Config:** next.config.js, tailwind.config.js
- **Types:** types/ or @types/
- **Utils:** lib/ or utils/

## NEXT STEPS FOR DEVELOPMENT

1. Review the file structure above
2. Check package.json for available scripts
3. Look for .env.example for required environment variables
4. Check docs/ folder for project documentation
5. Review README.md for project-specific instructions

---

Generated by InvestInPuglia.eu Audit Script
Use this document to onboard new developers or AI assistants
"@

Add-Content -Path $outputFile -Value $quickStart

Write-Host "`nAudit complete!" -ForegroundColor Green
Write-Host "Report saved to: $outputFile" -ForegroundColor Yellow

# Create a minimal version
$minimalFile = "INVESTINPUGLIA_QUICK_BRIEF.md"

@"
# INVESTINPUGLIA.EU QUICK BRIEF

**Project:** InvestInPuglia.eu
**Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Stack Detected
[Check main audit file for details]

## Key Directories
[Check main audit file for structure]

## Quick Commands
- npm install
- npm run dev
- npm run build

## Notes
- Full audit available in: INVESTINPUGLIA_PROJECT_AUDIT.md
- Update this brief with project-specific details after review
"@ | Out-File -FilePath $minimalFile -Encoding UTF8

Write-Host "Quick brief saved to: $minimalFile" -ForegroundColor Yellow
Write-Host "`nYou can now share these files with any new AI session for instant context!" -ForegroundColor Cyan