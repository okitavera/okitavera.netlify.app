const htmlmin = require("html-minifier");

module.exports = ({ eleventy, metadata }) => {
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

  eleventy.addTransform("externalLinks", (content, outputPath) => {
    const excludes = ["/", "#", metadata.url];
    if (outputPath && outputPath.endsWith(".html")) {
      const $ = require("cheerio").load(content);
      $("a").each((_, elem) => {
        const href = $(elem).attr("href");
        if (href && !href.match(`^(${excludes.join("|")}).*`)) {
          $(elem).attr("rel", "external noopener");
          $(elem).attr("target", "_blank");
        }
      });
      return $.html();
    }
    return content;
  });
};
