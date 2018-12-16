(() => {
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

  new LazyLoad({
    elements_selector: ".---ll"
  });

  new SmoothScroll('a[href*="#"]', {
    topOnEmptyHash: true,
    easing: "easeOutQuint",
    updateURL: true,
    popstate: true,
    emitEvents: true,
    speed: 500,
    speedAsDuration: true
  });

  if (document.querySelector(".disqus_thread") !== null) {
    const script = document.createElement("script");
    script.src = "https://{{ metadata.disqus.username }}.disqus.com/embed.js";
    script.setAttribute("data-timestamp", +new Date());
    (document.head || document.body).appendChild(s);
  }
})(window, document);
