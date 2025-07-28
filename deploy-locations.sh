#!/bin/bash
# PATH: deploy-locations.sh

# Step 1: Create the necessary directories
mkdir -p app/\[locale\]/locations/\[slug\]

# Step 2: Create the location page file
# Copy the content from the "Location Page Route" artifact to:
# app/[locale]/locations/[slug]/page.tsx

# Step 3: Create the locations index page
# Copy the content from the "Locations Index Page" artifact to:
# app/[locale]/locations/page.tsx

# Step 4: Update your Navbar component
# Add the Locations link as shown in the "Updated Navbar" artifact

# Step 5: Commit and push
git add .
git commit -m "feat: Add 50 location pages for programmatic SEO"
git push origin main

# Step 6: Check Netlify deployment
echo "Check your Netlify dashboard for deployment status"
echo "Once deployed, your location pages will be available at:"
echo "  - /en/locations"
echo "  - /en/locations/bari"
echo "  - /en/locations/lecce"
echo "  - /en/locations/taranto"
echo "  - etc..."

# Step 7: Generate and submit sitemap
echo "After deployment:"
echo "1. Generate sitemap with all location URLs"
echo "2. Submit to Google Search Console"
echo "3. Request indexing for priority cities"

# Priority cities to monitor:
echo ""
echo "🔥 PRIORITY CITIES TO MONITOR:"
echo "  - Bari (highest population)"
echo "  - Taranto (industrial hub)"
echo "  - Lecce (tourism + business)"
echo "  - Foggia (agriculture center)"
echo "  - Brindisi (port city)"
echo "  - Andria (manufacturing)"
echo "  - Barletta (commerce)"
echo "  - Monopoli (coastal tourism)"
