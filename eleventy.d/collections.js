module.exports = ({ eleventy }) => {
  const INVEN_DIR = "./inventory";
  eleventy.addCollection("posts", (collection) =>
    collection
      .getFilteredByGlob(`${INVEN_DIR}/article/*.md`)
      .sort((a, b) => a.date - b.date)
  );

  eleventy.addCollection("tags", (collection) =>
    collection
      .getAll()
      .flatMap((d) => d.data.tags)
      .filter((d, i, R) => typeof d === "string" && R.indexOf(d) == i)
      .sort((a, b) => a.localeCompare(b))
  );
};
