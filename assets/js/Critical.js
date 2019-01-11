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
var IlluminateIcons = document.createElement("link");
IlluminateIcons.rel = "stylesheet";
IlluminateIcons.href = "/assets/css/IlluminateIcons.css";
IlluminateIcons.type = "text/css";
loadIcons.parentNode.insertBefore(IlluminateIcons, loadIcons);
