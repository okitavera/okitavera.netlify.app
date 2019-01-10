import isExternal from "is-url-external";

const PageLoader = (loaderDone) => {
  function loaderInit() {
    var links = document.querySelectorAll("a:not([href^='#'])");
    links.forEach((a) => {
      var pageURL = a.getAttribute("href");
      if (!isExternal(pageURL) && !pageURL.match(/\/\#/g)) {
        a.onclick = (e) => {
          e.preventDefault();
          pageFetcher(pageURL);
        };
      }
    });
  }

  window.addEventListener("popstate", function(event) {
    renderer(event.state);
  });

  function pageFetcher(url) {
    var parser = new DOMParser();
    fetch(url)
      .then((response) => response.text().then((text) => Promise.resolve(text)))
      .then((html) => renderer(parser.parseFromString(html, "text/html"), url))
      .then(loaderInit)
      .then(loaderDone);
  }

  function renderer(page, url = null) {
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

  loaderInit();
};

export default PageLoader;
