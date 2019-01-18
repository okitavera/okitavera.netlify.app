module.exports = ({ eleventy }) => {
  eleventy.addShortcode("fallbackImg", (url, attr = "") => {
    const fallbackImg = `
    <img ${attr} src="${url}"/>
    `;
    return fallbackImg;
  });

  eleventy.addShortcode("copyrightYear", (firstYear) => {
    const yrNow = new Date().getFullYear();
    return firstYear.concat("-" + yrNow);
  });

  eleventy.addShortcode("generateColorFrom", (title) => {
    var hash = title
      .split("")
      .reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);
    var hue = hash % 360;
    return `hsl(${hue}, 36%, 63%)`;
  });
};
