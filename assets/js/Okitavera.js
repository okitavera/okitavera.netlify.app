import "@babel/polyfill";
import LazyLoad from "vanilla-lazyload";
import disqusLoader from "./modules/DisqusLoader";
import importScr from "./modules/ImportSrc";
import pageLoader from "./modules/PageLoader";

function backToTopButton() {
  setInterval(function() {
    var body = document.documentElement || document.body;
    if (body.scrollTop > body.clientHeight / 4 ? 1 : 0) {
      document.querySelector(".backtotop").classList.add("show");
    } else {
      document.querySelector(".backtotop").classList.remove("show");
    }
  }, 250);
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
      moveBackground();
    } else {
      window.requestAnimationFrame(moveBackground);
    }
  }
}

var lazyLazy = new LazyLoad({ elements_selector: ".imlazy" });
var onscrolling = function() {
  backToTopButton();
  moveBanner();
};
var initialize = function() {
  lazyLazy.update();
  document.documentElement.style.scrollBehavior = "smooth";
  disqusLoader(disqusdata.username);
  document.querySelectorAll(".btn").forEach(function(btn) {
    var color = getComputedStyle(btn).color;
    btn.addEventListener("mouseover", function() {
      btn.style.color = color;
    });
  });
};

if ("fetch" in window) {
  pageLoader(initialize);
}

if (!"scroll-behaviour" in document.documentElement.style) {
  importScr("/assets/js/polyfills/ScrollBehaviour.js");
}

window.addEventListener("load", initialize);
window.addEventListener("scroll", onscrolling, { passive: true });

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
