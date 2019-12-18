---
title: "Mosh: SSH, But slow-connection Friendly"
desc: "A another little tips that comes from my past holidays"
date: 2019-12-18
tags:
  - ssh
  - linux
  - server
splash:
  url: "/assets/img/contents/laptop-and-traveling.jpg"
---
Yes, doing some code while at holidays is kinda...weird. (nah, definitely it's 1000% weird)
But lets imagine for a seconds if you've never experience that, you can feel the _windy-air_, and hear some natural sounds, while opening your _vim_ or _vscode_. Sounds great, isn't it ?
Yeah, until you realize that you need to access your _24/7 container_ and you don't have a _decent_ connection to do that :D.

## SSH

Secure Shell (SSH) is a fundamental things for us to connect into servers. It's pretty secure and easy-to-use, but SSH isn’t perfect.
The main reason that I didn't like SSH is, the connection problems.
When you have a big network latency, it leads to very-bad typing performance.
Even when you have a pretty decent connection, it can still forcing you to kill it and reconnect, sometimes.

## Mosh

__Mosh__ is a replacement for SSH, it's a "_Remote terminal application that allows roaming, supports intermittent connectivity, and provides intelligent local echo and line editing of user keystrokes._" - _mosh.org_
Mosh focus on providing more robust connection, especially over low-speed internet connections, just like were my case above.

> But how can they resolve this typing-delay problem ?

__Mosh__ uses UDP-based _State Synchronization Protocol_, which is responsible for sync the snapshots of the current screen state.
This protocol is aimed at showing the client the most recent server-side state, and is designed to use datagrams/heartbeats to maintain the connection.
Because SSP synchronizes two states instead of waiting for data to actually get transferred, Mosh can display the UI changes much faster.

## Installation

Just like SSH, Mosh need to be installed on both the server and client

```
$ sudo pacman -S mosh   # there's also a `mosh-git` on the AUR
```

## Connect

Just like SSH :
```
$ mosh USER@YOUR-IP-ADDRESS
```
or If you want to use your SSH key for the auth :
```
$ mosh --ssh="ssh -i ~/.ssh/identity" USER@YOUR-IP-ADDRESS
```

You can see [Usage](https://mosh.org/#usage) page for more information.

## Downside

Mosh is not a 100% perfect replacement.
The one that I have to deal with it is, it doesn't export my `$TERM` variable, instead, it uses their own predefined ones (which is `xterm`) but passes _escape sequences_ unmodified.

It maybe not a "problem" for _xterm_ users, but for me (which uses _rxvt_) it's a problem since _xterm_ and _rxvt_ use different escape sequences.

Because of that, I had to forcefully set `$TERM` to `rxvt-unicode-256color` on my server's `.zshrc` to get my __HOME__ and __END__ button works perfectly.
You can also use [_urxvt-xtermcompat_](http://www.netswarm.net/misc/urxvt-xtermcompat.txt) config if you don't want to mess-up with your server shell config.

<br>

In the end, there's still no 100% perfect replacement for SSH, but atleast Mosh give us better typing experience especially on slow internet connection.
Alright, _Happy Mosh-ing!_ (it may sounds weird but whatever :D )
