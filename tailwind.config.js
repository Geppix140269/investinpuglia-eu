/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        terracotta: {
          DEFAULT: '#D2691E',
          dark: '#B8540D',
          light: '#E4762E'
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      }
    }
  },
  plugins: []
}
