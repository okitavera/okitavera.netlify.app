module.exports = (username) => {
  function loadDisqus() {
    if (!window.disqusFrame) {
      document.getElementById("btnDQ").style.display = "none";
      window.disqusFrame = true;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://${username}.disqus.com/embed.js`;
      script.async = true;
      script.setAttribute("data-timestamp", +new Date());
      (document.head || document.body).appendChild(script);
    }
  }
  const dqFrame = "disqus_thread";
  if (document.getElementById(dqFrame)) {
    if (
      /bot|google|baidu|bing|msn|duckduckgo|slurp|yandex/i.test(
        navigator.userAgent
      )
    ) {
      loadDisqus();
    } else {
      window.disqusFrame = false;
      if (!document.getElementById("btnDQ")) {
        const btn = document.createElement("button");
        btn.className = "btn bg-transparent txt-accent btn-outline";
        btn.id = "btnDQ";
        btn.innerText = "View Comments";
        btn.onclick = () => loadDisqus();
        document.getElementById(dqFrame).appendChild(btn);
        document.getElementById(dqFrame).align = "center";
      }
    }
  }
};
