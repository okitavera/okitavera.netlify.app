import FontFaceObserver from "fontfaceobserver";
import Fonts from "../FontLoaderData.js";

var recipes = [];
Fonts.final.variant.forEach(function(list) {
  recipes.push(
    new FontFaceObserver(Fonts.final.name, {
      weight: list.split(" ").shift(),
      style: list.split(" ").pop() == "" ? "normal" : list.split(" ").pop()
    })
  );
});

Promise.all(recipes).then(function() {
  sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
});
