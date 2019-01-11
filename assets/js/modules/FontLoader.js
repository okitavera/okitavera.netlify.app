/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */
const fontLoader = (fontData) => {
  if (typeof window.sessionStorage == "undefined") {
    // apply fonts immediate if there is no sessionStorage
    document.documentElement.className += " webfont-stage-2";
  } else {
    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
      document.documentElement.className += " webfont-stage-2";
    } else if ("fonts" in document) {
      document.fonts.load(`1em ${fontData.critical.name}`).then(function() {
        document.documentElement.className += " webfont-stage-1";

        var recipes = [];
        fontData.final.variant.forEach(function(list) {
          let variant = list
            .split(" ")
            .reverse()
            .join(" ")
            .concat(" ");
          recipes.push(document.fonts.load(variant + fontData.final.name));
        });

        Promise.all(
          recipes.map(function(font) {
            return font.catch(function(e) {
              return e;
            });
          })
        ).then(function() {
          document.documentElement.className += " webfont-stage-2";
          // Optimization for Repeat Views
          sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
        });
      });
    } else {
      // use fallback
      var ref = document.getElementsByTagName("script")[0];
      var script = document.createElement("script");
      script.src = "/assets/js/polyfills/FontLoaderFallback.js";
      script.type = "text/javascript";
      script.async = true;
      ref.parentNode.insertBefore(script, ref);
    }
  }
};

export default fontLoader;
