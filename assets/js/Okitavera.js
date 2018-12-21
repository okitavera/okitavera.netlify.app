import "@babel/polyfill";
import "scroll-behavior-polyfill";
import PictPaint from "./PicturePainter";

new PictPaint('.imlazy');

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

const dqFrame = "disqus_thread";

function loadDisqus() {
  if (!window.disqusFrame) {
    document.getElementById("btnDQ").style.display = "none";
    window.disqusFrame = true;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://${disqusdata.username}.disqus.com/embed.js`;
    script.async = true;
    script.setAttribute("data-timestamp", +new Date());
    (document.head || document.body).appendChild(script);
  }
}

if (/bot|google|baidu|bing|msn|duckduckgo|slurp|yandex/i.test(navigator.userAgent)) {
  loadDisqus();
} else if (document.getElementById(dqFrame)) {
  window.disqusFrame = false;
  if (!document.getElementById("btnDQ")) {
    const btn = document.createElement("button");
    btn.className = "button button-outline"
    btn.id = "btnDQ";
    btn.innerText = "view comments";
    btn.onclick = () => loadDisqus();
    document.getElementById(dqFrame).appendChild(btn);
    document.getElementById(dqFrame).align = "center";
  }
}

/*!
 * Copyright (c) 2018 Nanda Okitavera
 * MIT License
 * https://github.com/okitavera/okitavera.me
 */
