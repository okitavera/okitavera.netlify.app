import "@babel/polyfill";
import disqusLoader from "./modules/DisqusLoader";
import importScr from "./modules/ImportSrc";

const html = document.documentElement || document.body;
const body = document.querySelector("body");

function toggleScrollTopView(button) {
  setInterval(() => {
    const treshold = html.scrollTop > html.clientHeight / 4 ? 1 : 0;
    button.classList.toggle("show", treshold);
  }, 250);
}

function parseTwitterDate(tdate) {
  let system_date = new Date(Date.parse(tdate));
  let user_date = new Date();
  if (navigator.userAgent.match(/MSIE\s([^;]*)/))
    system_date = Date.parse(tdate.replace(/( \+)/, " UTC$1"));
  let diff = Math.floor((user_date - system_date) / 1000);
  if (diff <= 1) return "just now";
  if (diff < 60) return diff + "s";
  if (diff <= 60) return "1m";
  if (diff <= 3540) return Math.round(diff / 60) + "m";
  if (diff <= 5400) return "1h";
  if (diff <= 86400) return Math.round(diff / 3600) + "h";
  if (diff <= 129600) return "1d";
  if (diff < 604800) return Math.round(diff / 86400) + "d";
  if (diff <= 777600) return "1w";
  return "on " + system_date;
}

function themeSwitcher() {
  let splash = `
  <div class="dank-splash__body">
    <div class="dank-splash__container">
      <span class="dank-splash__wave"></span>
      <span class="dank-splash__wave"></span>
      <span class="dank-splash__overlay"></span>
      <img class="dank-splash" src="/assets/img/avatars/me.png">
      <div class="dank-splash__msg">${
        body.classList.contains("dank") ? "Deactivating" : "Activating"
      } Dank mode</div>
    </div>
  </div>`;
  body.insertAdjacentHTML("beforeend", splash.trim());
  const timeTo = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? { paint: 0, remove: 0 }
    : { paint: 2000, remove: 300 };

  setTimeout(() => {
    const dank = document.querySelector(".dank-splash__body");
    dank.classList.add("dismiss");
    body.classList.toggle("dank");
    sessionStorage.dankMode = body.classList.contains("dank");
    setTimeout(() => body.removeChild(dank), timeTo.remove);
  }, timeTo.paint);
}

function onPageScroll() {
  toggleScrollTopView(document.querySelector(".backtotop"));
}

function onPageLoad() {
  document
    .querySelectorAll("button.dank")
    .forEach((b) => (b.onclick = themeSwitcher));

  document.querySelector(".sidebar__mobile-menu").onclick = () => {
    const mc = document.querySelector(".mobile-menu__wrapper").classList;
    if (mc.contains("state--active") || mc.contains("state--inactive"))
      mc.toggle("state--inactive");
    mc.toggle("state--active");
  };

  document.querySelectorAll(".twitter-date").forEach((date) => {
    date.innerHTML = parseTwitterDate(date.getAttribute("data-date"));
  });
  disqusLoader(disqusdata.username);
}

if (!"scroll-behaviour" in document.documentElement.style)
  importScr("/assets/js/polyfills/ScrollBehaviour.js");

window.addEventListener("load", onPageLoad);
window.addEventListener("scroll", onPageScroll, { passive: true });

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
