/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  // Optimize for production
  mode: process.env.NODE_ENV === 'production' ? 'jit' : undefined,
  theme: {
    extend: {
      colors: {
        // Investment-focused professional palette
        primary: {
          DEFAULT: '#1e3a8a', // Navy Blue - trust, stability
          light: '#3b82f6',
          dark: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#d97706', // Amber/Gold - wealth, premium
          light: '#fbbf24',
          dark: '#b45309',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        accent: {
          DEFAULT: '#0891b2', // Cyan - modern, tech-forward
          light: '#22d3ee',
          dark: '#0e7490',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Neutral grays for borders and backgrounds
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Investment-specific colors
        gold: {
          DEFAULT: '#d97706',
          light: '#fbbf24',
          dark: '#b45309',
        },
        navy: {
          DEFAULT: '#1e3a8a',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        // Keep black and white for contrast
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        // Zara-inspired typography
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Didot', 'Bodoni MT', 'Playfair Display', 'serif'],
        display: ['Didot', 'Bodoni MT', 'Playfair Display', 'serif'],
      },
      fontSize: {
        // Refined typography scale for luxury fashion aesthetic
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'super-wide': '0.2em',
      },
      spacing: {
        // Minimalist spacing scale
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}