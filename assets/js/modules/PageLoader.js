import isExternal from "is-url-external";

const PageLoader = (loaderDone) => {
  const STATE_POP = 10,
    STATE_PUSH = 11;

  function linksListener() {
    var links = document.querySelectorAll("a:not([href^='#'])");
    links.forEach((a) => {
      var url = a.getAttribute("href");
      if (!isExternal(url) && !url.match(/\/\#/g)) {
        a.onclick = (e) => {
          e.preventDefault();
          getPage(url, STATE_PUSH);
        };
      }
    });
  }

  function getPage(url, type = STATE_POP) {
    var parser = new DOMParser();
    fetch(url)
      .then((response) => response.text().then((text) => Promise.resolve(text)))
      .then((html) =>
        renderPage(parser.parseFromString(html, "text/html"), url, type)
      )
      .then(linksListener)
      .then(loaderDone);
  }

  function renderPage(page, url = null, type = STATE_POP) {
    if (page) {
      document.title = page.title;
      document.querySelectorAll("title,main").forEach((el, i) => {
        if (el.innerHTML != null) {
          var src = page.querySelectorAll("title,main")[i];
          el.innerHTML = src.innerHTML;
        }
      });
      document.querySelectorAll("meta").forEach((el, i) => {
        if (el.getAttribute("content") != null) {
          var src = page.querySelectorAll("meta")[i].getAttribute("content");
          el.setAttribute("content", src);
        }
      });
    }
    if (url != null && type != STATE_POP) {
      history.pushState({ location: url }, page.title, url);
    }
    document.documentElement.style.scrollBehavior = "unset";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  window.addEventListener("popstate", function(ev) {
    if (ev.state != null) getPage(ev.state.location, STATE_POP);
  });
  linksListener();
};

export default PageLoader;
