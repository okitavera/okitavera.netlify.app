---
title: "Kotlin std-function: apply() and also()"
desc: "A little notes about apply() and also() function on kotlin"
date: 2019-01-17
tags:
  - Kotlin
  - android
splash:
  url: "/assets/img/banners/kotlin.jpg"
---

After learning a kotlin and made some apps with it, I came to the realisation that there are a lot of my code that still not use "the kotlin-ways" to solve a problem.
And maybe someone will says like "It's okay, as long as your app is works and you can bought a starbucks coffee from it".

Yeah that is the another reason why I code, I do this for the cup of coffee,
but the another reason is because I like doing it.
I like making a progress and improving my skills.
And while that, I think I'll wrote a simple note for it on my web :)

Anyways, let's just jump into it guys!

<center>

![lets-just-jump-into-it](/assets/img/articles/lets-just-jump-into-it.gif)

</center>

# Infix Functions No.1 : apply()

By definition, `apply()` accepts a function, and sets its scope to the object on which apply has been invoked.

Okay, That means we can initialize an object properties without even explicitly referencing the object itself, of course as long as we declare it inside the scope of `apply()` itself

Let's take a look about this code :

```kotlin
val sticker = ImageView(this)
sticker.id = R.id.thesticker
sticker.alpha = (input.transparency / 10f)
sticker.isClickable = false
if (fromURI) {
  sticker.setImageURI(Uri.parse(input.uri))
} else {
  sticker.setImageResource(Const.STICKER_LIST[input.index])
  sticker.setColorFilter(input.color)
}
```

as you can see, everytime we set a properties, we need to type the variable name of the `ImageView()` that we initialize before.
with the `apply()` infix, we can forget about that variable name :

```kotlin
val sticker = ImageView(this).apply{
  id = R.id.thesticker
  alpha = (input.transparency / 10f)
  isClickable = false
  if (fromURI) {
    setImageURI(Uri.parse(input.uri))
  } else {
    setImageResource(Const.STICKER_LIST[input.index])
    setColorFilter(input.color)
  }
}
```

# Infix Function No.2 : also()

From the description, it calls the specified function block with `this` value as its argument and returns `this` value.
It maybe sounds confusing to beginners like me, but in practical it very simple.

The `also()` itself will invoke the code inside the scope of `also()`, but also it taking a `this` from the parent scope.

Okay, let's try to apply it into our code before :

```js
val sticker = ImageView(this).apply{
  id = R.id.thesticker
  alpha = (input.transparency / 10f)
  isClickable = false
  if (fromURI)
    setImageURI(Uri.parse(input.uri))
  else
    setImageResource(STICKER_LIST[input.index])
      .also{ setColorFilter(input.color) }
}
```

So, the `setColorFilter()` now are inside the `also()` of `setImageResource()`.
But the context values are still following the `apply()` of our `ImageView()`.
It allow us to chaining multiple functions but still not forgetting that we're still passing our properties to the objects.

<center>...</center>

I hope it’s helpful for you. Thanks!
