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
    fontFamily: {
      sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
    },
    extend: {
      // screens: {
      //   2xl: '1536px',
      // },
    },
  },
  variants: {
    // opacity: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
