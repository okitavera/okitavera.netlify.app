import importSrc from "./importSrc";

const disqusLoader = (username) => {
  function loadDisqus() {
    if (!window.disqusFrame) {
      document.getElementById("btnDQ").style.display = "none";
      window.disqusFrame = true;
      importSrc(`https://${username}.disqus.com/embed.js`);
    }
  }
  var dqFrame = "disqus_thread";
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
        var btn = document.createElement("button");
        btn.className = "btn bg-transparent txt-accent btn-outline";
        btn.id = "btnDQ";
        btn.innerText = "View Comments";
        btn.onclick = function() {
          loadDisqus();
        };
        document.getElementById(dqFrame).appendChild(btn);
        document.getElementById(dqFrame).align = "center";
      }
    }
  }
};

export default disqusLoader;
