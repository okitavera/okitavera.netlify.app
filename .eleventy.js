const {DateTime} = require("luxon");
const {URL} = require("url");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (eleventy) => {
  // js and styluses are processed by gulp
  // so we only copy imgs and fonts
  eleventy.addPassthroughCopy("assets/img");
  eleventy.addPassthroughCopy("assets/fonts");
  eleventy.addPassthroughCopy("robots.txt");
  eleventy.addPlugin(pluginRss);
  eleventy.addPlugin(pluginSyntaxHighlight);

  eleventy.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: "utc"}).toFormat(
      "LLLL dd, yyyy"
    );
  });

  eleventy.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  });

  eleventy.addFilter("prettySlug", (slug) => {
    return slug.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  });

  eleventy.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("./data/article/*.md").sort((a, b) => {
      return a.date - b.date;
    });
  });

  eleventy.addCollection("tags", (collection) => {
    let tagSet = new Set();
    collection.getAllSorted().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventy.addCollection("projects", (collection) => {
    return collection.getFilteredByGlob("./data/projects/*").sort((a, b) => {
      return a.date - b.date;
    });
  });

  eleventy.addShortcode("codeheader", (context = "Title", title) => {
    return `<div class="codeheader"><span>${context}: </span>${title}</div>`;
  });

  eleventy.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventy.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventy.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
      permalinkBefore: false
    })
  );

  return {
    templateFormats: ["md", "njk"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "modules",
      data: "data/manifest",
      output: require("./data/manifest/metadata.json").site.output
    }
  };
};
