# Investment-Focused Theme

Professional, investment-grade design with prominent PIA grant features and calculator.

## Color Palette - Investment Professional

### Navy Blue (Primary) - Trust & Stability
```css
--navy-900: #1e3a8a  /* Main brand color */
--primary-700: #1d4ed8  /* Lighter variant */
--primary-500: #3b82f6  /* Hover states */
```

### Gold/Amber (Secondary) - Wealth & Premium
```css
--secondary-600: #d97706  /* Main gold */
--secondary-400: #fbbf24  /* Lighter gold */
--secondary-700: #b45309  /* Dark gold */
```

### Cyan (Accent) - Modern & Tech-Forward
```css
--accent-600: #0891b2  /* Main cyan */
--accent-400: #22d3ee  /* Lighter cyan */
--accent-700: #0e7490  /* Dark cyan */
```

## Key Features

### 1. ✨ Investment-Focused Hero
- Dark navy gradient background
- Professional grid pattern overlay
- 4 Stats cards with glass morphism:
  - €100M+ Total Projects
  - €25M Grants Secured
  - 50% Max Grant Rate
  - 50+ Success Stories
- Clear CTAs for grant calculator and portfolio

### 2. 💰 **PROMINENT Mini PIA & PIA Grants Section**

This is the centerpiece of the theme!

**Left Side - Interactive Calculator:**
- Grant type selector (Mini PIA vs PIA Turismo)
- Investment amount slider (€100K - €5M)
- Real-time grant calculation
- Results display:
  - Grant rate (40% or 50%)
  - Maximum grant amount
  - Estimated grant for your investment
  - Your required investment
- Quick links to:
  - Full Calculator
  - Complete Guide

**Right Side - Program Benefits:**
- **Mini PIA Tourism Grant** card:
  - 40% non-refundable grant, max €800K
  - For projects €500K - €2M
  - Fast-track approval (3-6 months)
  - Perfect for boutique properties

- **PIA Turismo Grant** card:
  - 50% non-refundable grant, max €10M
  - For major developments (€2M+)
  - Hotels, resorts, large projects
  - Full support from start to finish

- **Why Work With Us** card:
  - €25M in grants secured
  - 50+ successful projects
  - Link to free consultation

### 3. 🎬 Video Portfolio Section
- 4 video clips with play overlays
- Dark navy background with grid pattern
- Professional presentation
- Duration badges

### 4. 📊 Portfolio Slider
- Real portfolio data with grant amounts displayed
- Shows grant secured on each project
- Glass morphism cards
- Navigation arrows and dots

### 5. 📞 CTA Section
- Dark background with professional pattern
- Glass morphism card
- Two CTAs:
  - Schedule Consultation
  - Download PIA Guide

## Navbar Features

### Desktop:
- Logo with navy gradient and icon
- Clean navigation links
- **PROMINENT "💰 Mini PIA" button** with gold background
- Dropdown shows:
  - "Non-Refundable Grants" header
  - "Up to 50% funding" subheader
  - Complete Guide link
  - Grant Calculator link

### Mobile:
- **Highlighted Mini PIA section** with gold background
- Easy access to grant resources
- Responsive design

## Calculator Logic

### Mini PIA:
```javascript
Grant = min(Investment × 40%, €800,000)
```

### PIA Turismo:
```javascript
Grant = min(Investment × 50%, €10,000,000)
```

## Component Usage

### Use the Investment Theme:
```tsx
import NavbarInvestment from '@/components/NavbarInvestment'
import InvestmentTheme from '@/components/InvestmentTheme'

export default function Page() {
  return (
    <>
      <NavbarInvestment />
      <InvestmentTheme />
    </>
  )
}
```

### Color Classes:
```tsx
{/* Navy backgrounds */}
<div className="bg-navy-900 text-white">

{/* Gold accents */}
<span className="text-secondary-600">

{/* Cyan highlights */}
<div className="border-accent-600">

{/* Gradients */}
<h1 className="bg-gradient-to-r from-navy-900 to-primary-700
               bg-clip-text text-transparent">
```

### Buttons:
```tsx
{/* Navy button */}
<button className="cta-button cta-primary">
  Calculate Grant
</button>

{/* Gold button */}
<button className="cta-button cta-secondary">
  View Portfolio
</button>
```

### Badges:
```tsx
{/* Navy badge */}
<span className="badge badge-primary">
  Portfolio Highlights
</span>

{/* Gold badge */}
<span className="badge badge-secondary">
  💰 NON-REFUNDABLE GRANTS
</span>

{/* Cyan badge */}
<span className="badge badge-accent">
  Visual Portfolio
</span>
```

## Design Philosophy

### Professional Investment Aesthetic:
- **Navy Blue**: Trust, stability, professionalism
- **Gold**: Wealth, premium, success
- **Cyan**: Modern, innovative, tech-forward

### Glass Morphism:
- Maintains modern, premium feel
- Provides depth and sophistication
- Works on both light and dark backgrounds

### Focus on Grants:
- Calculator is prominent and easy to use
- Clear explanation of both grant programs
- Multiple CTAs to guide and calculator
- Real examples with grant amounts shown

## Sections Breakdown

1. **Hero** (100vh)
   - Investment-focused messaging
   - 4 key stats
   - Dual CTAs

2. **Mini PIA Section** (py-24) **← MAIN FEATURE**
   - Split layout (calculator + benefits)
   - Interactive calculator
   - Program comparison
   - Links to full resources

3. **Video Portfolio** (py-24)
   - 4 clips in grid
   - Professional dark background

4. **Portfolio Slider** (py-24)
   - Real projects with grants
   - Interactive navigation

5. **CTA** (py-24)
   - Final conversion push
   - Dual actions

## Key Differences from Other Themes

| Feature | Personalized | Investment |
|---------|-------------|------------|
| Colors | Purple/Emerald | Navy/Gold/Cyan |
| Focus | Portfolio | PIA Grants |
| Calculator | None | Prominent, interactive |
| Feel | Modern luxury | Professional investment |
| Primary CTA | Portfolio | Grant Calculator |

## Preview

Visit: **http://localhost:3000/zara-theme**

You'll see:
1. Professional hero with investment stats
2. **Prominent grant calculator section**
3. Video portfolio gallery
4. Portfolio slider with grant amounts
5. Professional CTA section

## Files

**Components:**
- `components/InvestmentTheme.tsx` - Main theme
- `components/NavbarInvestment.tsx` - Professional navbar

**Config:**
- `tailwind.config.js` - Investment colors
- `app/globals.css` - Updated button/badge styles
- `app/zara-theme/page.tsx` - Demo page

## Perfect For

✅ Serious investors seeking grant funding
✅ Showcasing financial expertise
✅ Emphasizing government grant programs
✅ Professional, trustworthy brand image
✅ Lead generation for consultations

## Next Steps

1. Test the calculator with different amounts
2. Customize grant percentages if needed
3. Add your actual grant guide PDF link
4. Update consultation booking link
5. Deploy!

---

**Investment Theme** = Professional + Grants-Focused + Calculator + Navy/Gold/Cyan 🏆
