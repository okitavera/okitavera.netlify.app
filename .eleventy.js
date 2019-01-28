const fs = require("fs");
const metadata = JSON.parse(fs.readFileSync("./manifest/metadata.json"));
const ModLoader = require("./modloader");

module.exports = (eleventy) => {
  ModLoader("./eleventy.d", {
    eleventy,
    metadata,
    fs
  });

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
