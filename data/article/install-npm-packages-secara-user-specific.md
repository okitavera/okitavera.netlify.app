---
title: "Install npm packages Secara User-specific Layaknya Pro"
date: 2018-12-13
tags:
  - npm
  - nodejs
  - web-development
splash:
  url: "/assets/img/articles/splashes/npm-install-user.jpg"
  credit: "Image: https://unsplash.com/photos/k03ornGON08"
---

Seperti yang kamu tau, secara default `npm install -g` akan menginstall packages secara global agar bisa dipakai tanpa harus masuk ke folder node project kamu, yang pasti sangat membantu sekali terutama pada packages yang mempunyai cli interfaces seperti `gulp`, `webpack`, `gylphhanger`, dan sejenisnya.

Sayangnya, kamu harus menjalankan `npm` nya menggunakan root user, atau memakai `sudo` jika ingin menginstall packages secara global.
Menurutku, itu sangatlah riskan, dimana `npm` mempunyai ratusan-ribu packages dan tidak menutup kemungkinan adanya [malicious packages](https://www.google.com/search?q=npm+malicious+packages).
Dan juga, beberapa orang juga tidak suka mengetik sudo.

> "typing sudo everytimes is freaking sucks!"
> <span>Okitavera</span>

> "F-word society"
> <span>Elliot Alderson</span>

> "I ask you one better, why's sudo ?"
> <span>Drax the Destroyer</span>

> "Subscribe to PewDiePie"
> <span>HackerGiraffe</span>

Lalu, bagaimana solusinya ?
Kita atur lokasi npm packages nya di user directory, Huuray!

## Prefix di ~/.npmrc

Pertama-tama, agar `npm` menginstall package kamu secara user-specific, pertama-tama kamu harus menentukan lokasi nya di file `~/.npmrc`.

```bash
prefix=${HOME}/.local/node
```

Untuk aku, aku menentukan lokasinya di `~/.local/node`, karena terlihat lebih bersih dan tidak membuat `~` ku semakin penuh (karena sudah terlalu banyak file-file lain).

## Lokasi binary executables

Untuk bisa meng-eksekusi langsung `npm` packages yang sudah kamu install nanti; seperti biasa, kamu cukup menambahkan lokasi folder binary nya ke dalam daftar `$PATH` kamu di file yang biasa kamu pakai sebagai deklarasi `$PATH` seperti `~/.bashrc`, `~/.zshrc`, `~/.bash_profile`, atau `~/.profile`.

```bash
# lokasi folder untuk node packages kamu
NPM_PREFIX="${HOME}/.local/node"

# mencegah duplikat lokasi node packages
if [[ -z $(printf $PATH | grep $NPM_PREFIX/bin) ]]; then
  export PATH="$NPM_PREFIX/bin:$PATH"
fi
```

## Manual-page (man) untuk aplikasi cli

Jika kamu penggemar command `man` (aku tidak), kamu harus menambahkan node manpath nya ke `$MANPATH` kamu.

```bash
# secara default, manual path tidak ter-expose ke env.
# untuk mendapatkan default manual path, kamu bisa invoke subshell langsung : $(manpath)
if [[ -z $(printf $PATH | grep $NPM_PREFIX/share/man) ]]; then
  export MANPATH="$NPM_PREFIX/share/man:$(manpath)"
fi
```

Setelah itu, kamu bisa mereload terminal emulator kamu untuk bisa menggunakannya.
atau kamu juga bisa import ulang file yang tadi kamu edit jika kamu tidak mau menutup terminal emulator, dengan command `source` :

```bash
source ~/.profile
```
