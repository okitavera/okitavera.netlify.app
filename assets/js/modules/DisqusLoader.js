import importSrc from "./ImportSrc";

const disqusLoader = (username) => {
  var dqFrame = "disqus_thread";
  var botName = /bot|google|baidu|bing|msn|duckduckgo|slurp|yandex/i;

  function loadDisqus() {
    if (!window.disqusFrame) {
      document.getElementById("btnDQ").style.display = "none";
      importSrc(`https://${username}.disqus.com/embed.js`);
    }
  }

  function drawDisqusButton(onclick) {
    if (!document.getElementById("btnDQ")) {
      var btn = document.createElement("button");
      btn.className = "btn bg-transparent txt-accent btn-outline";
      btn.id = "btnDQ";
      btn.innerText = "View Comments";
      btn.onclick = onclick;
      document.getElementById(dqFrame).appendChild(btn);
      document.getElementById(dqFrame).align = "center";
    }
  }

  if (document.getElementById(dqFrame)) {
    if (botName.test(navigator.userAgent)) loadDisqus();
    else drawDisqusButton(loadDisqus);
  }
};

export default disqusLoader;
