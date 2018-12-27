import "@babel/polyfill";
import "scroll-behavior-polyfill";
import LazyLoad from "vanilla-lazyload";
import DisqusLoader from "./DisqusLoader";

new LazyLoad({
  elements_selector: ".imlazy"
});

document.documentElement.style.scrollBehavior = "smooth";

const body = document.documentElement || document.body;
var scrolling = false;
window.onscroll = () => (scrolling = true);
setInterval(() => {
  if (scrolling) {
    scrolling = false;
    if (body.scrollTop > body.clientHeight / 4 ? 1 : 0) {
      document.querySelector(".backtotop").classList.add("show");
    } else {
      document.querySelector(".backtotop").classList.remove("show");
    }
  }
}, 250);

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
  DisqusLoader(disqusdata.username);
});

if (document.querySelector("[data-parallax]")) {
  window.addEventListener(
    "scroll",
    function() {
      const moveBackground = () => {
        var img = document.querySelector("[data-parallax]");
        var yPos = window.pageYOffset / 6;
        img.style.backgroundPosition = `0% -${yPos}px`;
      };
      if (!window.requestAnimationFrame) {
        var lastAnim = 0;
        const currAnim = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currAnim - lastAnim));
        const id = window.setTimeout(moveBackground, timeToCall);
        lastAnim = currAnim + timeToCall;
      } else {
        window.requestAnimationFrame(moveBackground);
      }
    },
    { passive: true }
  );
}

// preserve button color on hover
document.querySelectorAll(".btn").forEach((btn) => {
  const color = getComputedStyle(btn).color;
  btn.onmouseover = () => {
    btn.style.color = color;
  };
});

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
