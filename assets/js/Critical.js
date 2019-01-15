// import fontLoader from "./modules/FontLoader";
// import fontData from "./FontLoaderData";
// fontLoader(fontData);

document.documentElement.classList.remove("no-js");
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register(`/service-worker.js?v=${buildstamp}`);
