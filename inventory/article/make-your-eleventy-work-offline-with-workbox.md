---
title: "Turn Your Eleventy into Offline-First PWA"
description: "In this post, Okitavera explaining step-by-step how to use eleventy-plugin-pwa to make an Offline-First PWA Eleventy-powered website"
date: 2019-01-07
tags:
  - eleventy
  - JAMstack
  - webdev
splash:
  url: "/assets/img/banners/eleventy-offline.jpg"
  credit: "an event that happens approximately 66 million years ago, chromiumized"
---

After mobile first, offline first and progressive web apps (PWA) are the current trend at the moment.
So, why not to make your eleventy's powered website works in offline too ?

## Install PWA-plugin for eleventy

Let’s start by installing [eleventy-plugin-pwa](https://www.npmjs.com/package/eleventy-plugin-pwa)

```bash
$ npm install eleventy-plugin-pwa --save-dev
```

In this case, using plugin instead using workbox-cli or other interface like gulp/webpack are easier,
Especially when you're using the `eleventy --serve` to test and watch your changes, since this plugin will automatically follow and rebuild our service-worker too.

## Adding it to Eleventy config file

As usual, we need to include the plugin in our `.eleventy.js` to enable it.

```js
// .eleventy.js
const pluginPWA = require("eleventy-plugin-pwa");

module.exports = (eleventyConfig) => {
  //...
  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./build/service-worker.js",
    globDirectory: "./build",
    clientsClaim: true,
    skipWaiting: true
  });
  //...
};
```

Also you can use it without any configuration, which by default it will set the destination to `${eleventy.outputDir}/service-worker.js`.

For more info about the options, you can read here :
https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config

## manifest.json

To make it installable on mobile devices, we need to add `./manifest.json` for it.

```json
{
  "name": "My Beautiful Website",
  "short_name": "okitavera.me",
  "icons": [
    {
      "src": "/assets/img/favicon/192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/img/favicon/512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ec407a",
  "background_color": "#ec407a",
  "display": "standalone",
  "start_url": "/"
}
```

copy `./manifest.json` directly using `addPassthroughCopy()` ([documentation](https://www.11ty.io/docs/copy/))

```js
module.exports = (eleventyConfig) => {
  //...
  eleventyConfig.addPassthroughCopy("manifest.json");
  //...
};
```

Also don't forget to mention that file inside your header

```html
<head>
  ...
  <link rel="manifest" href="/manifest.json" />
  ...
</head>
```

## Registering Service Worker

Now the tricky part is registering service worker.
Because we need our website updated everytime the we had a new content, we need to cache-bust the service worker file.

The simplest ways to do this is using eleventy's addFilter to append a new string everytime we run the eleventy to build our page.

```js
// .eleventy.js
module.exports = (eleventyConfig) => {
  //...
  // append "?v=timestamp" to the end of str
  eleventyConfig.addFilter("cacheBust", (str) => {
    const dateNow = Date.now();
    return str.concat(`?v=${dateNow}`);
  });
  //...
};
```

And finally, we put a simple javascript into our header/footer to register the service-worker.

```html
{% raw %}
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("{{ '/service-worker.js' | cacheBust }}")
      .then(function() {
        console.log("ServiceWorker has been registered!");
      })
      .catch(console.error);
  }
</script>
{% endraw %}
```

## Final

Okay, it's time to test our 5 minutes work.

![pwa-chrome-console](/assets/img/articles/pwa-chrome-console.png)

Lighthouse benchmark:
![pwa-chrome-lighthouse](/assets/img/articles/pwa-chrome-bench.png)
