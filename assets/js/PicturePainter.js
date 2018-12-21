module.exports = (cls) => {
  const query = document.querySelectorAll(cls);

  function imgDrawer(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.removeAttribute('data-src');
    img.setAttribute('data-loaded', "true");
  }

  function imgManager() {
    for (var i = 0; i < query.length; i++) {
      if (query[i].getAttribute('data-src')) {
        imgDrawer(query[i]);
      } else if (query[i].setAttribute('data-loaded') != "true") {
        query[i].setAttribute('data-loaded', "true");
      }
    }
  }

  if (window.caches) {
    Promise.all([].slice.call(query).map(i => {
      const src = i.getAttribute('data-src');
      return window.caches.match(src).then(response => {
        if (response) imgManager();
      })
    })).then(imgManager);
  } else {
    imgDrawer(query);
  }
}
