module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Optimize CSS in production
    ...(process.env.NODE_ENV === 'production' ? {
      'postcss-flexbugs-fixes': {},
      'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          minifyFontValues: { removeQuotes: false }
        }]
      }
    } : {})
  },
}
