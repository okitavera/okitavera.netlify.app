/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */
(function () {
  "use strict";
  // Optimization for Repeat Views
  if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
    document.documentElement.className += " webfont-stage-2";
    return;
  } else if ("fonts" in document) {
    document.fonts.load("1em SourceSansProCriticalSubset").then(function () {
      document.documentElement.className += " webfont-stage-1";
      var latinFont = "SourceSansProLatinSubset";
      Promise.all([
        document.fonts.load("400 1em " + latinFont),
        document.fonts.load("700 1em " + latinFont),
        document.fonts.load("300 1em " + latinFont),
        document.fonts.load("italic 1em " + latinFont),
        document.fonts.load("italic 700 1em " + latinFont),
        document.fonts.load("italic 300 1em " + latinFont)
      ]).then(function () {
        document.documentElement.className += " webfont-stage-2";
        // Optimization for Repeat Views
        sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
      });
    });
  } else {
    // use fallback
    var ref = document.getElementsByTagName("script")[0];
    var script = document.createElement("script");
    script.src = "/assets/js/FontLoaderFallback.js";
    script.type = "text/javascript";
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }
})();
