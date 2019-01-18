document.documentElement.classList.remove("no-js");
(function(d) {
  let hTag = d.documentElement;
  if (sessionStorage.webfonts || !("fonts" in d)) {
    hTag.classList.add("enhanced-webfonts");
    return;
  } else if ("fonts" in d) {
    let variants = [
      "400",
      "300",
      "700",
      "900",
      "italic 400",
      "italic 300",
      "italic 700",
      "italic 900"
    ];
    Promise.all(
      variants.map((it) =>
        d.fonts.load(it + " 1em LatoLatinSubset").catch((err) => err)
      )
    ).then(
      () => hTag.classList.add("enhanced-webfonts"),
      (sessionStorage.webfonts = true)
    );
  }
})(document);
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register(`/service-worker.js?v=${buildstamp}`);
