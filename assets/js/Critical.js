document.documentElement.classList.remove("no-js");
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js");

function dayNight(html) {
  if (window.sessionStorage.themeMode == 'night') {
    html.classList.add("night");
  } else if (window.sessionStorage.themeMode == 'day') {
    html.classList.remove("night");
  } else {
    console.log("themeMode not found. adjusting based on time");
    hour = (new Date()).getHours();
    if (hour > 4 && hour < 18) {
      html.classList.remove("night");
    } else {
      html.classList.add("night");
    }
    return
  }
}

// immediately apply theme if possible
dayNight(document.documentElement || document.body);
// otherwise, wait for the DOM.
document.addEventListener("DOMContentLoaded", function () {
  dayNight(document.documentElement || document.body);
});
