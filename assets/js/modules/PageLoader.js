import isExternal from "is-url-external";

const PageLoader = (loaderDone) => {
  function linksListener() {
    var links = document.querySelectorAll("a:not([href^='#'])");
    links.forEach((a) => {
      var url = a.getAttribute("href");
      if (!isExternal(url) && !url.match(/\/\#/g)) {
        a.onclick = (e) => {
          e.preventDefault();
          getPage(url);
        };
      }
    });
  }

  function getPage(url) {
    var parser = new DOMParser();
    fetch(url)
      .then((response) => response.text().then((text) => Promise.resolve(text)))
      .then((html) =>
        renderPage(parser.parseFromString(html, "text/html"), url)
      )
      .then(linksListener)
      .then(loaderDone);
  }

  function renderPage(page, url = null) {
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
    if (url != null) {
      var state = {
        url: url,
        contents: JSON.stringify(page)
      };
      history.pushState(state, page.title, url);
      document.documentElement.style.scrollBehavior = "unset";
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  window.addEventListener("popstate", function(event) {
    renderPage(event.state);
  });
  linksListener();
};

export default PageLoader;
