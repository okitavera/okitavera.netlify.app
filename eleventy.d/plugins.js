const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");

module.exports = ({ eleventy }) => {
  eleventy.addPlugin(pluginRss);
  eleventy.addPlugin(pluginSyntaxHighlight);
  eleventy.addPlugin(pluginPWA);
};
