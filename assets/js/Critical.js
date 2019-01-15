import fontLoader from "./modules/FontLoader";
import fontData from "./FontLoaderData";

fontLoader(fontData);

document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "has-js"
);

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register(`/service-worker.js?v=${buildstamp}`);
