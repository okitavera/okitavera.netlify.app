import fontLoader from "./modules/FontLoader";
import fontData from "./FontLoaderData";

fontLoader(fontData);

document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "has-js"
);

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register(`/service-worker.js?v=${buildstamp}`);

var loadIcons = document.getElementsByTagName("link")[0];
var cssIcons = document.createElement("link");
cssIcons.rel = "stylesheet";
cssIcons.href = "/assets/css/IlluminateIcons.css";
cssIcons.type = "text/css";
loadIcons.parentNode.insertBefore(cssIcons, loadIcons);
