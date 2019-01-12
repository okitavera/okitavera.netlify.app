module.exports = ({ eleventy }) => {
  eleventy.addShortcode("fallbackImg", (url, attr = "") => {
    const fallbackImg = `
    <noscript>
      <img ${attr} src="${url}"/>
    </noscript>
    <img ${attr} data-src="${url}"/>
    `;
    return fallbackImg;
  });

  eleventy.addShortcode("copyrightYear", (firstYear) => {
    const yrNow = new Date().getFullYear();
    return firstYear.concat("-" + yrNow);
  });
};
