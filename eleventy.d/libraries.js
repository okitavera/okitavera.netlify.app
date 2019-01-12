const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = ({ eleventy }) => {
  eleventy.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link jumper",
      permalinkSymbol: "#",
      permalinkBefore: false
    })
  );
};
