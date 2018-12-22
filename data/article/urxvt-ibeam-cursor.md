---
title: "Use I-beam cursor in rxvt-unicode"
date: 2018-12-23
tags:
  - rxvt-unicode
  - linux
splash:
  url: "/assets/img/thumbnails/urxvt.jpg"
---
I've been so many years with this terminal emulator, maybe the first time I use rxvt-unicode (or urxvt - for short) is maybe 2 or 3 months after my first touch with the linux desktop world.
I love the fact that this terminal emulator is a beast, it's like driving on Ludicrous+ mode, it just quick and fast.
And the most important things that I really like was the fact that it has so many things that you can customize,
like the fonts stack, colors, history buffer, border, cursor.
And of course you can write an extension for it, if the built-in options still not enough for you.

## Cursor

One of the options that urxvt has is the customizable cursor, you can either choose an underline or block-style cursor.

<center>

![](/assets/img/articles/urxvt-cursor-default.png)
<small>default cursor options</small>
</center>

And yeah, sadly there is no option for the I-beam cursor.

## Shell Trick
Suprisingly, you can still change the cursor via .bashrc or your prefered shell-rc by appending some weird unicode stuff like this :

```bash
# .bashrc

printf '\033[5 q\r'
```

<center>

![](/assets/img/articles/urxvt-cursor-ibeam.png)
<small>well, that's easy</small>
</center>

but what if you're not using bash for your interactive shell ?
yeah, that's right, you can just put that code on your shell startup (e.g: .zshrc).
but I think there is another way to do that cleverly, without messing up with your shell file.

## Extension

Since urxvt allow us to extend our own terminal emulator via some litte perl script, we can take the advantages of that to print our ibeam cursor everytime when the terminal emulator fired.

First things first, we need to create an `ext` directory inside `~/.urxvt/` folder :

```bash
$ mkdir -p ~/.urxvt/ext/
```

After that, we can create a file (without filename extension) inside of it, for example : `ibeamcursor`

```bash
$ code ~/.urxvt/ext/ibeamcursor
```

And then you can put this code.

```perl
#!/usr/bin/perl
# IBeam cursor in urxvt

use strict;
use warnings;

sub on_start
{
    my ($self) = @_;
    my $cmd = "\033[5 q\r";
    $self->cmd_parse ($cmd);
}
```

Then, finally we can activate the extension by including it in `~/.Xresources` :

```yaml
URxvt.perl-ext-common: ibeamcursor
```

Also, don't forget to reload the xrdb :

```bash
$ xrdb -merge ~/.Xresources
```

That's it, Enjoy for your new cursor :)
For more information about urxvt extension, you can visit jeromebelleman.gitlab.io/posts/productivity/urxvt