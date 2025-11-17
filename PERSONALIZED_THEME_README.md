# Personalized Zara-Inspired Theme

This is your custom theme that combines the clean, minimalist aesthetic of Zara with your brand colors, glass morphism effects, and real portfolio content.

## What You Got

### ✨ Design Features

1. **Clean Zara-Inspired Layout**
   - Minimalist, elegant design principles
   - Professional typography hierarchy
   - Generous white space
   - Clean, uncluttered interfaces

2. **Your Brand Colors**
   - Purple (`#9333ea`) - Primary brand color
   - Emerald (`#10b981`) - Secondary accent
   - Indigo (`#6366f1`) - Highlights and CTAs
   - Smooth gradients throughout

3. **Glass Morphism Effects**
   - Frosted glass cards with backdrop blur
   - Subtle transparency and depth
   - Modern, premium feel
   - Light and dark variants

4. **Real Portfolio Integration**
   - Uses your actual portfolio data (8 projects)
   - Interactive slider with navigation
   - Stats: €100M+, 50+ Hotels, €25M Grants

5. **Video Clip Placeholders**
   - 4 video clips with play buttons
   - Hover effects and glass overlays
   - Real thumbnails from your Cloudinary
   - Duration badges

## File Structure

### New Components
```
components/
├── PersonalizedZaraTheme.tsx      # Main personalized theme component
├── NavbarPersonalized.tsx          # Navbar with brand colors & glass effects
├── ZaraThemeDemo.tsx              # Original black/white Zara demo
└── NavbarZara.tsx                 # Original minimalist navbar
```

### Updated Files
```
tailwind.config.js                 # Color palette with brand colors
app/globals.css                    # Glass morphism & modern button styles
app/zara-theme/page.tsx           # Demo page (now personalized)
```

## Color Palette

### Primary (Purple)
```css
--primary-600: #9333ea  /* Main brand color */
--primary-500: #a855f7  /* Lighter variant */
--primary-700: #7e22ce  /* Darker variant */
```

### Secondary (Emerald)
```css
--secondary-600: #10b981 /* Fresh, modern accent */
--secondary-500: #34d399 /* Lighter variant */
--secondary-700: #059669 /* Darker variant */
```

### Accent (Indigo)
```css
--accent-600: #6366f1   /* Highlights */
--accent-500: #818cf8   /* Lighter variant */
--accent-700: #4f46e5   /* Darker variant */
```

### Neutral Grays
```css
--neutral-50: #fafafa   /* Lightest background */
--neutral-100: #f5f5f5  /* Light background */
--neutral-200: #e5e5e5  /* Borders */
--neutral-700: #404040  /* Dark text */
--neutral-900: #171717  /* Darkest text */
```

## Component Examples

### Glass Morphism Cards

**Light Glass Card:**
```tsx
<div className="glass-card">
  {/* Your content */}
</div>
```

**Dark Glass Card:**
```tsx
<div className="glass-card-dark">
  {/* Your content on dark backgrounds */}
</div>
```

### Buttons

```tsx
{/* Primary - Purple gradient */}
<button className="cta-button cta-primary">
  Explore Now
</button>

{/* Secondary - Emerald gradient */}
<button className="cta-button cta-secondary">
  Learn More
</button>

{/* WhatsApp */}
<button className="cta-button cta-whatsapp">
  Contact Us
</button>
```

### Badges

```tsx
{/* Primary - Purple */}
<span className="badge badge-primary">
  NEW ARRIVAL
</span>

{/* Secondary - Emerald */}
<span className="badge badge-secondary">
  FEATURED
</span>

{/* Accent - Indigo */}
<span className="badge badge-accent">
  TRENDING
</span>
```

### Typography

```tsx
{/* Hero Heading with Gradient */}
<h1 className="font-display text-6xl font-bold tracking-tight
               text-transparent bg-clip-text
               bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600">
  INVEST IN PUGLIA
</h1>

{/* Section Heading */}
<h2 className="font-display text-4xl font-bold tracking-tight
               text-transparent bg-clip-text
               bg-gradient-to-r from-primary-600 to-secondary-600">
  Portfolio Highlights
</h2>

{/* Body Text */}
<p className="font-sans text-base text-neutral-600 leading-relaxed">
  Your content here
</p>
```

## Sections Included

### 1. Hero Section
- Animated gradient background
- Glass morphism stats cards
- Gradient text headings
- Dual CTA buttons
- Scroll indicator

### 2. Video Clips Gallery
- 4 video placeholders
- Play button overlays
- Glass effects on hover
- Duration badges
- Dark background with pattern

### 3. Portfolio Slider
- Real portfolio data (8 projects)
- Image + content layout
- Navigation arrows
- Dot indicators
- Glass card container

### 4. CTA Section
- Dark glass morphism card
- Gradient background
- Pattern overlay
- Dual action buttons

## How to Use

### Preview the Theme
1. Visit `http://localhost:3000/zara-theme`
2. Scroll through all sections
3. Test interactions (sliders, buttons, hover effects)

### Apply to Your Site

**Option 1: Use the Complete Component**
```tsx
import PersonalizedZaraTheme from '@/components/PersonalizedZaraTheme'

export default function Page() {
  return <PersonalizedZaraTheme />
}
```

**Option 2: Use Individual Sections**
Extract sections from `PersonalizedZaraTheme.tsx` and use them separately.

**Option 3: Use the Navbar**
```tsx
import NavbarPersonalized from '@/components/NavbarPersonalized'

export default function Layout({ children }) {
  return (
    <>
      <NavbarPersonalized />
      {children}
    </>
  )
}
```

## Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR', // Change primary color
    // ...
  }
}
```

### Adjust Glass Morphism
Edit `app/globals.css`:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7); /* Adjust opacity */
  backdrop-filter: blur(20px);           /* Adjust blur amount */
  /* ... */
}
```

### Modify Gradients
```css
/* Change button gradients */
.cta-primary {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

## Portfolio Data

The theme uses your real portfolio data from `components/PortfolioSlider.tsx`:
- 8 luxury properties
- Total value: €19.8M
- Locations: Otranto, Galatina, Nardò
- Project types: Masserie, Hotels, Heritage Restorations

To update portfolio:
1. Edit `portfolioProjects` array in `PersonalizedZaraTheme.tsx`
2. Or import from a centralized data file

## Video Clips

Current placeholders use Cloudinary URLs. To update:
1. Edit `videoClips` array in `PersonalizedZaraTheme.tsx`
2. Replace with your video URLs and thumbnails
3. Update durations

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with webkit prefixes for backdrop-filter)
- Mobile: Fully responsive

## Performance

- Lazy loading ready
- Optimized animations
- Responsive images
- Smooth transitions
- Hardware-accelerated effects

## Next Steps

1. ✅ Review the demo at `/zara-theme`
2. ✅ Customize colors if needed
3. ✅ Add your own content
4. ✅ Test on mobile devices
5. ✅ Deploy to production

## Comparison

| Feature | Original Zara | Personalized |
|---------|--------------|--------------|
| Colors | B&W only | Brand colors + gradients |
| Cards | Flat white | Glass morphism |
| Buttons | Sharp, minimal | Rounded, gradients |
| Portfolio | Placeholder | Real data |
| Videos | None | 4 clips included |
| Feel | Ultra minimal | Modern luxury |

## Questions?

- Original minimal theme: Use `NavbarZara.tsx` and `ZaraThemeDemo.tsx`
- Personalized theme: Use `NavbarPersonalized.tsx` and `PersonalizedZaraTheme.tsx`
- Mix and match as needed!

Enjoy your new personalized theme! 🎨✨
