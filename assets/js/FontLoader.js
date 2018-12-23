/* The Compromise
 * Critical FOFT with preload, with a polyfill fallback emulating font-display: optional
 * https://github.com/zachleat/web-font-loading-recipes
 */
import Fonts from "./FontLoaderData.js";

// Optimization for Repeat Views
if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
  document.documentElement.className += " webfont-stage-2";
} else if ("fonts" in document) {
  document.fonts.load(`1em ${Fonts.critical.name}`).then(function() {
    document.documentElement.className += " webfont-stage-1";

    const recipes = [];
    Fonts.final.variant.forEach((list) => {
      let variant = list
        .split(" ")
        .reverse()
        .join(" ")
        .concat(" ");
      recipes.push(document.fonts.load(variant + Fonts.final.name));
    });

    Promise.all(recipes.map((font) => font.catch((e) => e))).then(function() {
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
