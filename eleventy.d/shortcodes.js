module.exports = ({ eleventy }) => {
  eleventy.addShortcode("fallbackImg", (url, attr = "") => {
    const fallbackImg = `
    <img ${attr} src="${url}"/>
    `;
    return fallbackImg;
  });

  eleventy.addShortcode("progressBar", (title, percent) => {
    const progressBar = `<div class="progress"><div class="progress__name">${title}</div><div class="progress__percent" style="width:${percent}">${percent}</div><div class="progress__bar"><div class="progress__bar__loaded" style="width:${percent}"></div></div></div>`;
    return progressBar;
  });

  eleventy.addShortcode("copyrightYear", (firstYear) => {
    const yrNow = new Date().getFullYear();
    return firstYear.concat("-" + yrNow);
  });

  eleventy.addShortcode("generateColorFrom", (title) => {
    if (!title) title = "eleventy is cute";
    var hash = title
      .split("")
      .reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);
    var hue = hash % 360;
    return `hsl(${hue}, 36%, 63%)`;
  });
};
