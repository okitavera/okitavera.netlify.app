#!/usr/bin/env bash
if [[ ! -f scalable.svg ]];then
  echo "no scalable.svg file. exiting."
  exit 1
fi
for i in 16 32 96 192 512; do
  inkscape scalable.svg -e ${i}.png -w $i -h $i --without-gui
done
convert 32.png -define icon:auto-resize=32,16 icon.ico
