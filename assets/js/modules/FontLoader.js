/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */
const fontLoader = (data) => {
  var htmlTag = document.documentElement;
  if (sessionStorage.fontStage == 2) {
    htmlTag.classList.add("webfont-stage-2");
    return;
  } else if ("fonts" in document) {
    document.fonts
      .load(`1em ${data.critical.name}`)
      .then(function() {
        htmlTag.classList.add("webfont-stage-1");
        sessionStorage.fontStage = 1;
      })
      .then(function() {
        var recipes = [];
        data.final.variant.forEach(function(variant) {
          recipes.push(
            document.fonts.load(`${variant} 1em ${data.final.name}`)
          );
        });
        Promise.all(
          recipes.map(function(font) {
            return font.catch(function(e) {
              return e;
            });
          })
        ).then(function() {
          htmlTag.classList.add("webfont-stage-2");
          sessionStorage.fontStage = 2;
        });
      });
  }
};

export default fontLoader;
