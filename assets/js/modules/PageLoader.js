import isExternal from "is-url-external";

const PageLoader = (loaderDone) => {
  const STATE_POP = 10,
    STATE_PUSH = 11;

  function linksListener() {
    var links = document.querySelectorAll("a:not([href^='#'])");
    links.forEach((a) => {
      var url = a.getAttribute("href");
      if (
        typeof a.onclick !== "function" &&
        !isExternal(url) &&
        !url.match(/\/\#/g)
      )
        a.onclick = (e) => {
          e.preventDefault();
          getPage(url, STATE_PUSH);
        };
    });
  }

  function getPage(url, type = STATE_POP) {
    fetch(url)
      .then((response) => response.text().then((text) => Promise.resolve(text)))
      .then((page) => new DOMParser().parseFromString(page, "text/html"))
      .then((page) => renderPage(page, url, type))
      .then(linksListener)
      .then(loaderDone);
  }

  function pushContent(type, dest, src, attr) {
    if (!dest && !src) return;
    if (type === "html") dest.innerHTML = src.innerHTML;
    else if (type === "attr" && attr)
      dest.setAttribute(attr, src.getAttribute(attr));
  }

  function renderPage(page, url, type) {
    if (page) {
      document.title = page.title;
      pushContent(
        "html",
        document.querySelector("title"),
        page.querySelector("title")
      );
      pushContent(
        "html",
        document.querySelector("main"),
        page.querySelector("main")
      );
      var metaOrig = document.querySelectorAll("meta");
      var metaFetch = page.querySelectorAll("meta");
      metaOrig.forEach((meta, i) => {
        pushContent("attr", meta, metaFetch[i]);
      });
    }
    if (url && type != STATE_POP)
      history.pushState({ location: url }, document.title, url);
    document.documentElement.style.scrollBehavior = "unset";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  window.addEventListener("popstate", function(ev) {
    if (ev.state) getPage(ev.state.location, STATE_POP);
    else getPage(window.location.pathname, STATE_POP);
  });
  linksListener();
};

export default PageLoader;
