module.exports = ({ eleventy }) => {
  eleventy.addPassthroughCopy("assets/img");
  eleventy.addPassthroughCopy("assets/fonts");
  eleventy.addPassthroughCopy("webmanifest.json");
  eleventy.addPassthroughCopy("robots.txt");
};
