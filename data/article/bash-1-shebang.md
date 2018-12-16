---
title: "Bash #1: Shebang consistency"
date: 2018-11-28
tags:
  - bash
  - linux
splash:
  url: "/assets/img/articles/splashes/shebang.jpg"
---

The `/bin/sh` is usually a symlink to the system default shell.
It maybe a simple ways to do, especially for those who write the script in a pure POSIX shell.
But if you're write a bash script, that's definitely not a good idea.

Bash has more special features, like evaluation testing, c-style numerical for-loops, function prefixes, extended glob, caveats, mapfile, and many more.
Especially when it comes to portability, we also screwed by the distro-specific bash location.
Some distros are using `dash` by default, and the other are use `bash`, or `mksh`, or any else.
And that's definitely gonna breaks your bash script if you had a special feature that being used in your script.

If you write a bash script and your script looks like this :

{% codeheader "File" "my-magic-spells.sh" %}

```bash
#!/bin/sh

# your magical formulas here
```

Your script usually does not works well on every system that doesn't use bash as their default shell.

## the right ways

You should explicitly tell that your script are bash instead, like this :

{% codeheader "File" "my-magic-spells.sh" %}

```bash
#!/bin/bash

# your magical formulas here
```

## alternative ways

Or if you're afraid about being a bash is not in the `/bin` folder, you can use the `env` instead

{% codeheader "File" "my-magic-spells.sh" %}

```bash
#!/usr/bin/env bash

# your magical formulas here
```

Although this is definitely still cannot covering up all system since is still using an absolute path,
But atleast your script are correctly running under the interpreter (which is bash,) instead the system's default shell that you can't 100% predict.
