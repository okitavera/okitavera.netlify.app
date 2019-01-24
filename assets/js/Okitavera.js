import "@babel/polyfill";
import disqusLoader from "./modules/DisqusLoader";
import importScr from "./modules/ImportSrc";

function toggleScrollTopView(button) {
  var CALL_TICK = 250;
  setInterval(() => {
    var body = document.documentElement || document.body;
    var treshold = body.scrollTop > body.clientHeight / 4 ? 1 : 0;
    if (treshold) button.classList.add("show");
    else button.classList.remove("show");
  }, CALL_TICK);
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
  let components = `
  <div class="eggg__body">
    <div class="eggg__container">
      <span class="eggg__wave"></span>
      <span class="eggg__wave"></span>
      <span class="eggg__shaker"></span>
      <img class="eggg" src="/assets/img/avatars/ssi.jpg">
      <div class="eggg__msg">Hello there!</div>
    </div>
  </div>`.trim();

  document.querySelector(".easter-egg__container").innerHTML = components;
  setTimeout(function() {
    document.querySelector(".easter-egg__container").innerHTML = "";
  }, 2500);
}
var onPageScroll = function() {
  var button = document.querySelector(".backtotop");
  toggleScrollTopView(button);
};

var onPageLoad = function() {
  document.querySelectorAll(".twitter-date").forEach((date) => {
    date.innerHTML = parseTwitterDate(date.getAttribute("data-date"));
  });
  disqusLoader(disqusdata.username);
};

if (!"scroll-behaviour" in document.documentElement.style)
  importScr("/assets/js/polyfills/ScrollBehaviour.js");

window.addEventListener("load", onPageLoad);
window.addEventListener("scroll", onPageScroll, { passive: true });

document.querySelector(".owo").onclick = themeSwitcher;

document.querySelector(".sidebar__mobile-menu").onclick = () => {
  let menu = document.querySelector(".mobile-menu__wrapper");
  let state = "state--active";
  if (menu.classList.contains(state)) {
    menu.classList.replace(state, "state--inactive");
  } else if (menu.classList.contains("state--inactive")) {
    menu.classList.replace("state--inactive", state);
  } else {
    menu.classList.add(state);
  }
};
/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
