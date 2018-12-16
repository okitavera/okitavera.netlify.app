---
title: "One-shot To Kill Any Window Managers - Gracefully"
date: 2018-12-08
tags:
  - bash
  - linux
  - windowmanager
splash:
  url: "/assets/img/articles/splashes/logout-ui-reorr.jpg"
  credit: "Image Credit : https://www.deviantart.com/reorr/art/mek-oes-mohave-768247044"
---

<center>
<h2 style="text-transform:unset"><i>$ sudo pkill X</i></h2>

_Just kidding, are you sure you want to do that ? that's considered as anti-pattern for me._

</center>

---

One of the most exciting stuff about linux desktop is; You have the most customizable desktop OS in the entire universe because there is a lot of different desktop environment and window manager that you can use right ?
Today you decide to use _GNOME_, and then next day you're bored and open your _highly customized bspwm_ and so on, It so fun.

## Logout Manager

So, imagine you have a multiple setups are ready to use, let says _Openbox_, _i3-wm_, and _Xfce4_.
And then you see some beautiful logout manager like _Clearine_ or _Oblogout_.
But after you install those program, you also want to use that on every desktop you had.

## Bash Script !

Yes, here it is.<br>
We are just need to write a simple bash script that detecting what window manager are currently active!

{% codeheader "File" "wm-exit.sh" %}

```bash
#!/usr/bin/env bash

case $active_wm in
  "Openbox")
    openbox --exit
  ;;
  "i3")
    i3-msg exit
  ;;
  "Xfwm4")
    xfce4-session-logout -l
  ;;
esac
```

For the `$active_wm`, we can use those things like `$XDG_CURRENT_DESKTOP` or `$DESKTOP_SESSION`.
But wait, that's are not fully-universal, it will not works for those who uses no display manager, and different distros may have a different preset of those environment variable like _Ubuntu_.

So, how can we detect that without having a compatibility issues ?

## wmctrl

_wmctrl_ provides an interface to standard window management tasks, it also can read the name of currently active window manager.

Since for now we only care about that, lets just jump into it :

```bash
$ wmctrl -m
```

![wmctrl-m](/assets/img/articles/wmctrl-m.png)

Huuray!
we got the name, so lets put that things into our script before.

{% codeheader "File" "wm-exit.sh" %}

```bash
#!/usr/bin/env bash

active_wm=$(wmctrl -m | awk '/Name: / {printf "%s\n", $NF}')
case $active_wm in
  "Openbox")
    openbox --exit
  ;;
  "i3")
    i3-msg exit
  ;;
  "Xfwm4")
    xfce4-session-logout -l
  ;;
esac
```

set it executable by using chmod :

```bash
$ chmod +x wm-exit.sh
```

And you can call it from wherever you want (e.g. clearine, oblogout, polybar, etc).
