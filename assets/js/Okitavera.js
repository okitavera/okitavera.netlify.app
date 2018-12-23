import "@babel/polyfill";
import "scroll-behavior-polyfill";
import LazyLoad from "vanilla-lazyload";
import DisqusLoader from "./DisqusLoader";
new LazyLoad({
  elements_selector: ".imlazy"
});

document.documentElement.style.scrollBehavior = "smooth";

const visible = (el, state) => {
  el.style.visibility = state === 1 ? "visible" : "hidden";
  el.style.opacity = state;
};
const overlaylink = document.querySelectorAll("#ovm--btn,.mobile-menu a");
const overlayMenu = document.querySelector(".mobile-menu");
visible(overlayMenu, 0);
overlaylink.forEach((el) => {
  el.onclick = () => {
    const overlayButton = document.querySelector("#ovm--btn");
    const state = overlayMenu.style.visibility === "hidden" ? 1 : 0;
    visible(overlayMenu, state);
    state
      ? overlayButton.classList.add("opened")
      : overlayButton.classList.remove("opened");
  };
});

const body = document.documentElement || document.body;
var scrolling = false;
window.onscroll = () => (scrolling = true);
setInterval(() => {
  if (scrolling) {
    scrolling = false;
    visible(
      document.querySelector(".backtotop"),
      body.scrollTop > body.clientHeight / 4 ? 1 : 0
    );
  }
}, 250);

window.addEventListener("load", () => {
  DisqusLoader(disqusdata.username);
});

if (document.querySelector("[data-parallax]")) {
  window.addEventListener("scroll", function () {
    const moveBackground = () => {
      var img = document.querySelector("[data-parallax]");
      var yPos = window.pageYOffset / 6;
      img.style.backgroundPosition = `0% -${yPos}px`;
    }
    if (!window.requestAnimationFrame) {
      var lastAnim = 0;
      const currAnim = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currAnim - lastAnim));
      const id = window.setTimeout(moveBackground, timeToCall);
      lastAnim = currAnim + timeToCall;
    } else {
      window.requestAnimationFrame(moveBackground);
    }
  }, { passive: true });
}

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
