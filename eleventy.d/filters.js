const { DateTime } = require("luxon");
const readingTime = require("reading-time");
const slugify = require("slugify");

module.exports = ({ eleventy }) => {
  eleventy.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLLL dd, yyyy"
    );
  });

  eleventy.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
  });

  eleventy.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()#$~%.'":*?<>{}]/g,
      lower: true
    };
    return slugify(input, options);
  });

  eleventy.addFilter("getReadingTime", (content, format) => {
    const reader = readingTime(content);
    const options = {
      "%M": reader.minutes,
      "%W": reader.words
    };
    return format.replace(/%M|%W/gi, (match) => {
      return options[match];
    });
  });

  eleventy.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });
};
