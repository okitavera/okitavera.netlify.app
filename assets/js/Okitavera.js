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

var onPageScroll = function() {
  var button = document.querySelector(".backtotop");
  toggleScrollTopView(button);
};

var onPageLoad = function() {
  disqusLoader(disqusdata.username);
};

if (!"scroll-behaviour" in document.documentElement.style)
  importScr("/assets/js/polyfills/ScrollBehaviour.js");

window.addEventListener("load", onPageLoad);
window.addEventListener("scroll", onPageScroll, { passive: true });

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
