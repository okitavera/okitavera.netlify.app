---
title: "Zplug: My endgame of zsh framework"
date: 2018-12-03
tags:
  - zsh
  - linux
splash:
  url: "/assets/img/articles/splashes/zplug.jpg"
  credit: "Background from: https://unsplash.com/photos/7P8p1NBk37U"
---

To be honest, I am a lazy person. It was a very long time that I use the default Arch Linux `.zshrc`, they use the grml-zsh-config as their base config on their bootable image.
It was a "_well, it works_" experience for me, since the only things that I want from my terminal emulator is just a common things like command completions and finding history.

I am not saying that I don't need any basic stuff like commands aliases or a fun things like PS1 theming, but it really just fits in my daily usage even with the `.zshrc` that shipped with the archlinux image.

## Zsh Frameworks

Then I saw peoples are using some zsh frameworks, and yeah, I tried that too.
First of all, is the legendary _oh-my-zsh_. It was a great stuff. pretty powerfull and easy setup. changing some configuration like themes and plugins, is so easy.
But then I realize that my terminal emulator was not so fast comparing to the day when I use grml-zsh-config.
I mean, it was a great stuff and I like it but I think it was too over-powered for me LOL.

## Speed problem

"I need this type of sh\*t but with a faster performance"

My friends told me about _antigen_, but I did not enjoy with that.
Yeah it's minimal, but it does not feels really fast.

## Zplug

Well my first attention was not the features, but the logo.

![zplug logo](https://raw.githubusercontent.com/b4b4r07/screenshots/master/zplug/logo.png)

<center><small>"Hey that's my favourite color!" XD</small></center>

Then I just do `super` + `return` and then install that things, I am not even reading the entire README's markdown file LMAO.
But because it has zero built-in config, I have to configure before.
After an hours of finding some stuff like plugins and themes, my shell is finally done.

<center>Huuray!</center>

<center>

![zplug on my terminal emulator](/assets/img/articles/zplug-on-terminal-emulator.png)

</center>

As you can see, there is bunch of _oh-my-zsh_ libs right here XD
Yeah like I said before, I like oh-my-zsh, but it's too big for me.

Oh by the ways, here is the speed of zplug and with those plugins and themes:

<center>

![zplug on my terminal emulator - speed](/assets/img/articles/zplug-on-terminal-emulator-speed.png)

</center>

Pretty fast, is it ? I mean, it just less than half of second! If I compare to the oh-my-zsh before, it was like 2-3 seconds to get into the interactive shell, and that's not a great things for such opening terminal emulator. :(

And for the last things, if you want to see my configs, you can look at my dotfiles here :

https://github.com/okitavera/dotfiles/blob/master/assets/.zshrc

Thanks :)
