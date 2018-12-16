/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */

(function() {
  "use strict";
  // Optimization for Repeat Views
  if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
    document.documentElement.className += " fnV2";
    return;
  } else if ("fonts" in document) {
    document.fonts.load("1em SourceSansProSubset").then(function() {
      document.documentElement.className += " fnV1";
      Promise.all([
        document.fonts.load("400 1em SourceSansPro"),
        document.fonts.load("700 1em SourceSansPro"),
        document.fonts.load("300 1em SourceSansPro"),
        document.fonts.load("italic 1em SourceSansPro"),
        document.fonts.load("italic 700 1em SourceSansPro"),
        document.fonts.load("italic 300 1em SourceSansPro")
      ]).then(function() {
        document.documentElement.className += " fnV2";
        // Optimization for Repeat Views
        sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
      });
    });
  } else {
    // use fallback
    var ref = document.getElementsByTagName("script")[0];
    var script = document.createElement("script");
    script.src = "/assets/js/critical-foft-preload-fallback-optional.js";
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }
})();
