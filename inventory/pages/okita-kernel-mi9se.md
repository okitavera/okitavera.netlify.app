---
permalink: /okita-kernel-mi9se/
layout: page.njk
title: Okita Kernel For Xiaomi Mi 9 SE
desc: A Custom Kernel for Xiaomi Mi 9 SE to enhance performance and battery-life
---

> Discussion Thread : [xda-developers](https://forum.xda-developers.com/mi-9-se/development/kernel-okitakernel-v1-0-mi-9-se-27-2019-t3934029)
> GitHub Source : https://github.com/okitavera/okita-kernel-mi9se

{% for kernel in collections.kernel %}
{{ set ver = kernel.fileSlug }}
<span class="txt--big txt--700">Version {{ kernel.fileSlug }} &nbsp;&nbsp;<a class="btn btn--small bg--accent" href="{{ kernel.data.download }}">Download</a></span>
<blockquote>
<span class="txt--700">Changelog</span>
{{ kernel.templateContent | safe }}
</blockquote>
{% endfor %}
