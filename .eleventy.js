const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const navigation = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('about', 'layouts/about.njk');

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

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'all':
            case 'post':
              // case "posts":
              // case "nav":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  // Code Syntax Highlighting
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(navigation);

  // Pass thru static files
  eleventyConfig.addPassthroughCopy('./src/site/css');
  eleventyConfig.addPassthroughCopy('./src/site/img');
  // eleventyConfig.addPassthroughCopy('./src/site/fonts');

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    templateFormats: ['njk', 'md', 'jpg', 'jpeg', 'png'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: false,
  };
};
