module.exports = ({ eleventy }) => {
  const INVEN_DIR = "./inventory";
  eleventy.addCollection("posts", (collection) =>
    collection
      .getFilteredByGlob(`${INVEN_DIR}/article/*.md`)
      .sort((a, b) => a.date - b.date)
  );

  eleventy.addCollection("tags", (collection) => {
    let tagSet = new Set();
    collection.getAllSorted().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });
};
