---
title: Easy Kernel Firmware Extraction with csplitb
desc: "A quick tutorial about extracting the in-built kernel firmware"
date: 2019-07-13
tags:
  - android
  - linux
  - kernel
splash:
  url: "/assets/img/contents/android-phone-nullbyte.jpg"
  credit: "Image: https://null-byte.wonderhowto.com/how-to/exploit-routers-unrooted-android-phone-0178066/"
---

As you may know, I also had my own custom kernel for the Xiaomi Mi 9 SE.
It of course, uses the given trees from Xiaomi.

But as the time keep changing, they still don't give a frick about updating their codes even the built-in kernel on their latest ROM is already had so many improvements and changes over the sources that they uploads on their GitHub.

## Firmware

So, the device firmware is another things that we need for partial or full functionality of certain hardware devices.

And as you can see on your kernel tree, these binary blobs are usually proprietary because some hardware manufacturers do not release source code necessary to build the firmware itself.

But thankfully, since it was just a binary blobs, it is relatively easy to dump it from the pre-compiled kernel.

## Prepare

Before starting, we should have atleast :
- decompressed kernel binary (use `unpackbootimg` to get the `Image.gz` and extract the `Image` file from `Image.gz`)
- the old firmware binary for the magic number references (you can get it on the output directory of your kernel or converting the ihex files)
- `csplitb` for binary splitting (https://github.com/mypalmike/csplitb)
- `xxd` for inspecting the binaries.
- `dd` for dumping an actual firmware.
- `avr-objcopy` for binary blobs to ihex conversion.

## Finding the magic number

The magic number is needed for `csplitb` to identify the content header.
So, we need to get it from the old firmware binary files.

```
$ xxd <Original-Firmware> | head -n1
```
![get-magic-num](/assets/img/contents/get-magic-num.jpg)

We just need the 8 number of it, which is `0001 58fa`

## Inspecting the kernel binary

Before splitting, better if we just check the kernel binary if it has that magic number.

```
$ xxd <Kernel-Image> | grep '0001 58fa'
```
![inspect-kernel-with-the-magic-num](/assets/img/contents/inspect-kernel-with-the-magic-num.jpg)

Yay, we found it!

## Splitting firmware from kernel

Since we figured out that the kernel image is actually contains the firmware that we need, then let's just split it with `csplitb`.

```
$ csplitb --prefix dumped-fw- --suffix .bin --number 4 000158fa <Kernel-Image>
```
![get-content-from-magic-num](/assets/img/contents/get-content-from-magic-num.jpg)

And the result will be saved on `dumped-fw-0000.bin`.

## Get the right content of the firmware

To get the right right content of the actual firmware, we need to find out the exact size of the original firmware.

```
$ stat -c %s <Original-Firmware>
```
![get-original-fw-size](/assets/img/contents/get-original-fw-size.jpg)

And lets dump it with dd.

```
$ dd if=dumped-fw-0000.bin of=<New-Firmware-Name.bin> bs=<Size-Of-Original-Firmware> count=1
```
![get-the-actual-fw-bin](/assets/img/contents/get-the-actual-fw-bin.jpg)

## Convert the new firmware to Intel Hex files

Since we want to include it in our kernel trees, we should convert it from a binary blobs to Intel Hex.
We can do that using `avr-objcopy`.

```
$ avr-objcopy -I binary -O ihex <New-Firmware.bin> <New-Firmware.ihex>
```

And tadaaaa.. the new firmware is ready to cooks into the kernel.

![fw-bin-to-ihex](/assets/img/contents/fw-bin-to-ihex.jpg)
