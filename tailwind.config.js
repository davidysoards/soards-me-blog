/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    applyComplexClasses: true,
  },
  purge: {
    // enabled: true,
    content: ['./src/site/**/*.njk'],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      // screens: {
      //   2xl: '1536px',
      // },
      maxWidth: {
        text: '65ch',
        header: '45rem',
      },
    },
  },
  variants: {
    // opacity: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
