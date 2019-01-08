import "./FontLoader";

document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "has-js"
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`/service-worker.js?v=${buildstamp}`)
    .then(function() {
      console.log("ServiceWorker has been registered!");
    })
    .catch(console.error);
}

const loadIcons = document.getElementsByTagName("link")[0];
const IlluminateIcons = document.createElement("link");
IlluminateIcons.rel = "stylesheet";
IlluminateIcons.href = "/assets/css/IlluminateIcons.css";
IlluminateIcons.type = "text/css";
loadIcons.parentNode.insertBefore(IlluminateIcons, loadIcons);
