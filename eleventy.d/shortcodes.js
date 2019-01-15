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
};
