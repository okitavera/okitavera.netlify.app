document.documentElement.classList.remove("no-js");
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js");

document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement || document.body;

  if (window.sessionStorage.dankMode == "true")
    html.classList.add("dank");
});
