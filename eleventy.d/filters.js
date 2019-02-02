const { DateTime } = require("luxon");
const readingTime = require("reading-time");
const slugify = require("slugify");

module.exports = ({ eleventy }) => {
  eleventy.addFilter("parseDate", (it, format = "LLLL dd, yyyy") => {
    return DateTime.fromJSDate(it, { zone: "utc" }).toFormat(format);
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
      "%M": Math.round(reader.minutes),
      "%W": reader.words
    };
    return format.replace(/%M|%W/gi, (match) => {
      return options[match];
    });
  });

  eleventy.addFilter("twitterize", (content) =>
    content
      .replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1">#$1</a>')
      .replace(/@(\w+)/g, '<a href="https://twitter.com/$1">@$1</a>')
  );

  eleventy.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });
};
