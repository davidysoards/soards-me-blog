const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Minify js files
  eleventyConfig.addFilter('jsmin', (code) => {
    const Terser = require('terser');
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify the HTML in prod
  if (process.env.NODE_ENV == 'production') {
    eleventyConfig.addTransform(
      'htmlmin',
      require('./src/utils/minify-html.js')
    );
  }

  // Filters
  eleventyConfig.addFilter('formatDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'America/New_York',
    }).toFormat('LLLL d, y');
  });

  // Code Syntax Highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // Pass thru static files
  eleventyConfig.addPassthroughCopy('./src/site/css');
  eleventyConfig.addPassthroughCopy('./src/site/img');
  // eleventyConfig.addPassthroughCopy('./src/site/fonts');

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    templateFormats: ['njk', 'md', 'jpg', 'png'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: false,
  };
};
