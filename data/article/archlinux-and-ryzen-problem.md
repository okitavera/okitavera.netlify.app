---
title: Arch Linux, Windows, and Ryzen Problems
date: 2018-11-25
tags:
  - archlinux
  - linux
  - ryzen
splash:
  url: "/assets/img/articles/splashes/arch-ryzen.jpg"
  credit: "Image: AMD Ryzen and Arch Linux logo"
---

Recently I bought an ryzen powered laptop, since my old laptop is completely broken, and it was not have a really good support on Windows because the AMD doesn't even give us the generic drivers for it. They're keeps talking about giving a support via OEM, and you know, it sucks and dissapointing.
So I decide to give a try for the arch linux.
Because last time, I had a good experience for running arch on the FX-9830P, thanks to the great opensource amdgpu drivers.

First time, I booting up the arch liveiso via my android device.
Setting-up the partition, pacstrapping the root, install some X programs.
Well, so far so good.

Booting up to the partition, plays music on youtube, and doing some configuration stuff, and boom, everything suddenly refusing to respond my input.
Nice, So apparently, I got a fucking lockups lol.

I search about that, and the first fix was a setting the kernel params.
So I edit the grub.cfg, save it, and reboot.

{% codeheader "File" "/etc/grub/grub.cfg" %}

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet idle=nomwait"
```

Well apparenty that's works well...until the first 30 minutes. I got soft lockups again.
I search again, and finally I got the final fixes, that was disabling C6 states.

I found the awesome python script for that, https://github.com/r4m0n/ZenStates-Linux

```bash
./zenstates --c6-disable
```

And it works pretty well, there's no more lockups.
So I decide to make it start on boot by creating the systemd service like this :

{% codeheader "File" "/etc/systemd/system/zenstates.service" %}

```ini
[Unit]
Description=Zen C6 States Disabler
DefaultDependencies=no
After=sysinit.target local-fs.target
Before=basic.target

[Service]
Type=oneshot
ExecStart=/usr/bin/zenstates --c6-disable

[Install]
WantedBy=basic.target
```

That's pretty strange for me, I don't really know what is going on. but yeah, as long as it works.
But I'm still dissapointed by having a bad experience on Windows, that's ridiculous tho, since they're targeting the mainstream users.

I just hope they'll get into it soon, AMD is awesome before, especially for having a good FineWine drivers.
