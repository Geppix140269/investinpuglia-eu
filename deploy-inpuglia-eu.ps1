# PowerShell script to deploy inpuglia.eu variant to Netlify
# Run this script from the project root directory

Write-Host "=== Deploying inpuglia.eu variant to Netlify ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create new Netlify site
Write-Host "Step 1: Creating new Netlify site..." -ForegroundColor Yellow
Write-Host "You will need to select '1402 Celsius Ltd' team when prompted" -ForegroundColor Green
$createOutput = netlify sites:create --name inpuglia-eu-variant 2>&1 | Out-String
Write-Host $createOutput

# Extract site ID from output
if ($createOutput -match "Site ID:\s+([a-f0-9-]+)") {
    $newSiteId = $Matches[1]
    Write-Host "New site created with ID: $newSiteId" -ForegroundColor Green
} else {
    Write-Host "Could not extract site ID. Please check the output above." -ForegroundColor Red
    Write-Host "If site was created, find the ID and run:" -ForegroundColor Yellow
    Write-Host "  netlify sites:list" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 2: Configure the site to use the GitHub repository
Write-Host "Step 2: Configuring GitHub repository integration..." -ForegroundColor Yellow
netlify link --id $newSiteId

Write-Host ""

# Step 3: Set build settings
Write-Host "Step 3: Configuring build settings..." -ForegroundColor Yellow
netlify api updateSite --site-id $newSiteId --data '{
  "build_settings": {
    "cmd": "npm run build",
    "dir": ".next"
  },
  "repo": {
    "provider": "github",
    "repo": "Geppix140269/investinpuglia-eu",
    "branch": "inpuglia-eu-variant",
    "allowed_branches": ["inpuglia-eu-variant"]
  }
}'

Write-Host ""

# Step 4: Get environment variables from main site
Write-Host "Step 4: Fetching environment variables from main site..." -ForegroundColor Yellow
$mainSiteId = "4d05000c-827e-4750-8384-b0ab3a279334"
$envVars = netlify env:list --site-id $mainSiteId --json | ConvertFrom-Json

Write-Host "Found $($envVars.Count) environment variables" -ForegroundColor Green
Write-Host ""

# Step 5: Copy environment variables to new site
Write-Host "Step 5: Copying environment variables to new site..." -ForegroundColor Yellow
foreach ($envVar in $envVars) {
    $varName = $envVar.key
    Write-Host "  Setting $varName..." -ForegroundColor Gray

    # Get the value from main site
    $value = netlify env:get $varName --site-id $mainSiteId

    # Set on new site
    netlify env:set $varName $value --site-id $newSiteId --context production --context deploy-preview --context branch-deploy
}

Write-Host ""

# Step 6: Override NEXT_PUBLIC_SITE_URL for new domain
Write-Host "Step 6: Setting NEXT_PUBLIC_SITE_URL for inpuglia.eu..." -ForegroundColor Yellow
netlify env:set NEXT_PUBLIC_SITE_URL "https://inpuglia.eu" --site-id $newSiteId --context production --context deploy-preview --context branch-deploy

Write-Host ""

# Step 7: Add custom domain
Write-Host "Step 7: Adding custom domain inpuglia.eu..." -ForegroundColor Yellow
netlify domains:add inpuglia.eu --site-id $newSiteId

Write-Host ""

# Step 8: Enable Netlify Next.js plugin
Write-Host "Step 8: Installing @netlify/plugin-nextjs..." -ForegroundColor Yellow
netlify plugins:install @netlify/plugin-nextjs --site-id $newSiteId

Write-Host ""

# Step 9: Trigger initial production deploy
Write-Host "Step 9: Triggering initial production deploy..." -ForegroundColor Yellow
netlify deploy --prod --site-id $newSiteId

Write-Host ""
Write-Host "=== Deployment Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Site ID: $newSiteId" -ForegroundColor Cyan
Write-Host "Site URL: https://inpuglia.eu" -ForegroundColor Cyan
Write-Host "Admin URL: https://app.netlify.com/sites/inpuglia-eu-variant" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify the deployment at https://inpuglia.eu" -ForegroundColor White
Write-Host "2. Check DNS settings are correctly configured" -ForegroundColor White
Write-Host "3. Test all service tier pages and pricing functionality" -ForegroundColor White
Write-Host "4. Set up analytics to track A/B test results" -ForegroundColor White
