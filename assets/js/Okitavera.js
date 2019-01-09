import "@babel/polyfill";
import LazyLoad from "vanilla-lazyload";
import DisqusLoader from "./DisqusLoader";
import FetchPjax from "fetch-pjax";
import fetchScript from "./FetchScript";

// preserve button color on hover
document.querySelectorAll(".btn").forEach(function(btn) {
  var color = getComputedStyle(btn).color;
  btn.addEventListener("mouseover", function() {
    btn.style.color = color;
  });
});

function backToTopButton() {
  setInterval(function() {
    var body = document.documentElement || document.body;
    if (body.scrollTop > body.clientHeight / 4 ? 1 : 0) {
      document.querySelector(".backtotop").classList.add("show");
    } else {
      document.querySelector(".backtotop").classList.remove("show");
    }
  }, 250);
  document.querySelector(".backtotop").addEventListener("click", function(e) {
    e.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    history.replaceState(null, null, " ");
  });
}

function moveBanner() {
  var img = document.querySelector("[data-parallax]");
  function moveBackground() {
    var limit = img.offsetTop + img.offsetHeight;
    if (window.pageYOffset < limit) {
      img.style.backgroundPositionY = `-${window.pageYOffset / 6}px`;
    } else {
      img.style.backgroundPositionY = `0px`;
    }
  }
  if (img && window.matchMedia("(min-width: 775px)").matches) {
    if (!window.requestAnimationFrame) {
      var currAnim = new Date().getTime();
      let lastAnim = 0;
      let timeToCall = Math.max(0, 16 - (currAnim - lastAnim));
      setTimeout(moveBackground, timeToCall);
      lastAnim = currAnim + timeToCall;
    } else {
      window.requestAnimationFrame(moveBackground);
    }
  }
}

var onscrolling = function() {
  backToTopButton();
  moveBanner();
};

if (!"scroll-behaviour" in document.documentElement.style) {
  fetchScript("/assets/js/polyfills/ScrollBehaviour.js");
}

var lazyLazy = new LazyLoad({ elements_selector: ".imlazy" });
var initialize = function(pjax = false) {
  lazyLazy.update();
  if (pjax) lazyLazy.loadAll();
  document.documentElement.style.scrollBehavior = "";
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.documentElement.style.scrollBehavior = "smooth";
  DisqusLoader(disqusdata.username);
};

new FetchPjax({
  ignoreSelector: "[data-is-nav]",
  callbacks: {
    onCompletePjax: function() {
      return initialize(true);
    }
  }
});

window.addEventListener("load", initialize);
window.addEventListener("scroll", onscrolling, { passive: true });

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
