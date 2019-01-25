import importSrc from "./ImportSrc";

const disqusLoader = (username) => {
  const dqFrame = "disqus_thread";
  const dqButton = "disqus_loader";
  const botName = /bot|google|baidu|bing|msn|duckduckgo|slurp|yandex/i;

  function loadDisqus() {
    document.getElementById(dqButton).style.display = "none";
    importSrc(`https://${username}.disqus.com/embed.js`);
  }

  if (document.getElementById(dqFrame)) {
    if (botName.test(navigator.userAgent)) {
      loadDisqus();
    } else {
      document.getElementById(dqButton).onclick = loadDisqus;
    }
  }
};

export default disqusLoader;
