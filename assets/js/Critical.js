document.documentElement.classList.remove("no-js");
(function(d) {
  let hTag = d.documentElement;
  if (sessionStorage.webfonts || !("fonts" in d)) {
    hTag.classList.add("enhanced-webfonts");
    return;
  } else if ("fonts" in d) {
    let recs = [];
    let vars = [
      "400",
      "300",
      "700",
      "900",
      "italic 400",
      "italic 300",
      "italic 700",
      "italic 900"
    ];
    for (var i = 0; i < this.length; ++i) {
      recs.push(d.fonts.load(vars[i] + " 1em LatoLatinSubset"));
    }
    Promise.all(
      recs.map(function(f) {
        return f.catch(function(e) {
          return e;
        });
      })
    ).then(function() {
      hTag.classList.add("enhanced-webfonts");
      sessionStorage.webfonts = true;
    });
  }
})(document);
