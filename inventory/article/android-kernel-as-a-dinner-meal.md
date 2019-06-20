---
title: Linux Kernel for Android as a Dinner Meal
desc: "A little story about my walkthrough at linux kernel for android"
date: 2019-06-20
tags:
  - android
  - linux
  - kernel
splash:
  url: "/assets/img/contents/nexus-6p-bootloader.jpg"
  credit: "Image: https://pro-hackers.com/install-kali-linux-in-android-phone/"
---

Recently, I bought a brand new Mi 9 SE, it's a device from Xiaomi.
And as an Android app developer, I also love tweaking my own phone, even if it just adding more ~10 minutes battery life.
So yeah, the first thing that comes in mind after buying this phone is of course, "I'm gonna tweaks this phone's kernel".

Meanwhile, back in the time were I'm using a Xiaomi Redmi 2 Prime, I also makes a custom kernel for it.
But that's a very long time ago, and I can't remember anything about kernel hacking anymore, maybe it just got erased after passing my prefrontal cortex lmao.

After waiting for 15 days to unlock my phone's bootloader and installing a custom MIUI ROM (so I can get rid of those embedded ads by Xiaomi), I start to clone the Kernel's repository, downloading toolchains, and so on.
It just so easy since I just compiling the kernel, no error whatsoever.
But the nightmare is happens when I put the kernel into my phone's boot.img.

## Problems

I flash the kernel and restarting the phone as usual.
It boots, but keeps restarting again and again (bootloop).

And after an hour of researching, finally I can boot into the android.
The first problem is fixed; AVB (Android Verified Boot).
Well, I think that's my bad because I'm using a customized system and vendor images,
also the fixes are easy, just bypassing the avb by removing the flags on a device-tree source.

But another problem is coming, the Wi-Fi is literally dead. I can't even enable it.
I tried to load the wlan module manually, but it doesn't get loaded.
And after a few minutes, I remember that every modules that doesn't get compiled within the kernel, it will failed to load.
So I try to merge wlan modules from CAF, since Xiaomi doesn't provide the source of this module.

Merging module as subtree, and compiled successfully.
But it doesn't works either.

So, the last things that can I do, is hacking the verification process of modules.

![config_module_ignorever](/assets/img/contents/git-config-module-ignorever.png)

I put a `return` statement above all the verification process, and voila! I can connect to my wlan.


This is so ridiculous, since allowing any modules to be loaded is pretty much dangerous, but what can I do anyways without the right source ?

<center>

![without sauce meme](/assets/img/contents/meme-without-sauce.jpg)

</center>

## Concusion

This is where I feels bad about Linux kernel on Android. Yes, it's opensource, but many things inside of it are not.
I don't have much knowledge about license stuff, but still, I can see that many companies are don't give a damn about it.
