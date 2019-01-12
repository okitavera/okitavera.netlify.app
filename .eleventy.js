const { readFileSync, readdirSync } = require("fs");
const metadata = JSON.parse(readFileSync("./manifest/metadata.json"));

module.exports = (eleventy) => {
  ((dir) => {
    readdirSync(dir).forEach((file) => {
      require(dir + file)({ eleventy, metadata });
    });
  })("./eleventy.d/");

  return {
    templateFormats: ["md", "njk"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "views/modules",
      data: "manifest",
      output: metadata.site.output
    }
  };
};
