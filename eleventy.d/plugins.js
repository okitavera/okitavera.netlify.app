const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = ({ eleventy }) => {
  eleventy.addPlugin(pluginRss);
  eleventy.addPlugin(pluginSyntaxHighlight);
};
