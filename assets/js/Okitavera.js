import "@babel/polyfill";
import "scroll-behavior-polyfill";
import LazyLoad from "vanilla-lazyload";
import DisqusLoader from "./DisqusLoader";

try {
  new LazyLoad({
    elements_selector: ".imlazy"
  });
} catch (err) {
  document.querySelectorAll(".imlazy").forEach((el) => {
    const datasrc = el.getAttribute("data-src");
    el.setAttribute("src", datasrc);
    el.setAttribute("data-lazy", "false");
    el.classList.add("loaded");
  });
}
document
  .querySelectorAll(".hider")
  .forEach((child, i) =>
    setTimeout(() => child.classList.add("reveal-it"), 250 * i)
  );

// preserve button color on hover
document.querySelectorAll(".btn").forEach((btn) => {
  const color = getComputedStyle(btn).color;
  btn.addEventListener("mouseover", () => {
    btn.style.color = color;
  });
});

function backToTopButton() {
  setInterval(() => {
    const body = document.documentElement || document.body;
    if (body.scrollTop > body.clientHeight / 4 ? 1 : 0) {
      document.querySelector(".backtotop").classList.add("show");
    } else {
      document.querySelector(".backtotop").classList.remove("show");
    }
  }, 250);
}

function moveBanner() {
  const img = document.querySelector("[data-parallax]");
  function moveBackground() {
    const limit = img.offsetTop + img.offsetHeight;
    if (window.pageYOffset < limit) {
      img.style.backgroundPositionY = `-${window.pageYOffset / 6}px`;
    } else {
      img.style.backgroundPositionY = `0px`;
    }
  }
  if (img && window.matchMedia("(min-width: 775px)").matches) {
    if (!window.requestAnimationFrame) {
      const currAnim = new Date().getTime();
      let lastAnim = 0;
      let timeToCall = Math.max(0, 16 - (currAnim - lastAnim));
      setTimeout(moveBackground, timeToCall);
      lastAnim = currAnim + timeToCall;
    } else {
      window.requestAnimationFrame(moveBackground);
    }
  }
}

window.addEventListener(
  "scroll",
  () => {
    backToTopButton();
    moveBanner();
  },
  { passive: true }
);

window.addEventListener("load", () => {
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.classList.add("page-loaded");
  DisqusLoader(disqusdata.username);
});

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
