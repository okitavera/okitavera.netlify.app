/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */
const fontLoader = (data) => {
  let htmlTag = document.documentElement;
  if (sessionStorage.webfonts || !("fonts" in document)) {
    htmlTag.classList.add("enhanced-webfonts");
    return;
  } else if ("fonts" in document) {
    let recipes = [];
    data.final.variant.forEach(function(vars) {
      recipes.push(document.fonts.load(`${vars} 1em ${data.final.name}`));
    });
    Promise.all(
      recipes.map(function(f) {
        return f.catch(function(e) {
          return e;
        });
      })
    ).then(function() {
      htmlTag.classList.add("enhanced-webfonts");
      sessionStorage.webfonts = true;
    });
  }
};

export default fontLoader;
