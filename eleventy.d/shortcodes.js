module.exports = ({ eleventy }) => {
  eleventy.addShortcode(
    "fallbackImg",
    (url, attr = "") => `<img ${attr} src="${url}"/>`
  );

  eleventy.addShortcode(
    "progressBar",
    (title, percent) =>
      `<div class="progress"><div class="progress__name">${title}</div><div class="progress__percent" style="width:${percent}">${percent}</div><div class="progress__bar"><div class="progress__bar__loaded" style="width:${percent}"></div></div></div>`
  );

  eleventy.addShortcode("copyrightYear", (firstYear) =>
    firstYear.concat("-" + new Date().getFullYear())
  );

  eleventy.addShortcode("generateColorFrom", (title) => {
    if (!title) title = "eleventy is cute";
    var hash = title
      .split("")
      .reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);
    var hue = hash % 360;
    return `hsl(${hue}, 51%, 46%)`;
  });
};
