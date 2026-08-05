+++
title = "Binary Ninja! 🔪🍉 - CSS Edition"
description = "A post where we discuss how to use binary operators applied to CSS"
date = 2023-08-28
+++


### 🥷 Binary Ninja!

When learning a new programming language there's usually a section that I look at, expressly to _not_ to use! You see, for whatever reason most languages would ship with a _real_ "AND", and then with _another_ "AND", just confuse me! It'd be like this in JS, for example:

```js
// "real" AND
true && false; // => false
```

and then there's this... this _thing_!

```js
// what in the world!?
true & false; // => 0
```

Same thing with OR `|| vs. |` and with NOT `! vs. ~` and a few others.

Well, it seems like some wise people called those bit*wise* operator, and for the longest time I've intentionally avoided them, and got scared when I came across code that used them! Well, on the [CHIP8 project](/blog/the-adventures-of-writing-a-chip8-emulator-part-2) I had no choice but to face my fears and in this post I want to share with you how cool bitwise operator really are! My goal is not to be exhaustive and tell you everything about them, your programming language manual would be the place for that. Instead I want to share with you a use case and hopefully encourage you to find out more and add them to your programming toolbox!

Ok, buckle up and let's ge to it!

And it all starts with the name.

### Bitwise, some wise person once said about a bit... maybe. (sorry) 🤦‍♂️

Paying close attention to the name of these operators we get the biggest clue we need. Bit! The bitwise operators, curiously enough, operate on bits.

Back in the day, before every developer everywhere worked solely inside an `App.jsx` file, people used to think about how the data inside the computer looked like. You see, computers are not too clever. They only know how to say two things: `0` and `1`. That is all. When you put a bunch of those together and assign meaning to them you can fool yourself into thinking that computers are clever. Nah, people are, but people got tired of being clever and thus made computers to pretend to be instead of them.

Anyways, it is 2023, so let's get on with the times and do what everybody is doing nowadays, making websites pretty! 🎨

Imagine that we have the color [OliveDrab](https://www.w3schools.com/colors/color_tryit.asp?color=OliveDrab) (not to be confused with a drab olive, which might be moldy and thus not recommended for human consumption). That color in Hex is `0x6B8E23`, of you might see it as `#6B8E23` in a CSS file, same thing. Well, from our frontend dev knowledge we know that that number is actually three numbers that represent red, green, and blue values. And from a quick glance we can see that red would be `0x6B`, green `0x8E`, and blue `0x23`. Well, that's easy, but that's because you are not a computer! The computer only sees `0110 1011 1000 1110 0010 0011`.

So anyways, all the computer sees is `0x6B8E23` as one number, which in decimal is the number `7048739` or the binary `0110 1011 1000 1110 0010 0011` without any notion that there actually three pieces of data in that one number.

Now, we have received the task to convert all the hex numbers in our CSS files to rgb values (I know is hard to imagine such a ridiculous and meaningless task, but have you ever worked in tech?). Well, that's where our bitwise operators come to help us!

Let's start with the _wrong_ "AND" `&`. This, obviously, can be used to perform the logic AND function on two number, but is can also be used to mask bits (The term "mask" confused the heck out of me for many years! Hang on and hopefully after this it might make sense). By making we mean that it can let some bits "pass" and some others don't. Another way to think about it is, it can "hide" bits we don't care about.

Let's give it a try!

```c
0x6B8E23 & 0x0000FF // => 0x23
```

Would you look at that! We where able to get rid of all the pesky red and green and now we have the value of blue by itself. If you run this code you might see the value `35`, which is the value of `0x23` in decimal.

Very nifty, but what is happening? Why `0xFF`? Well, let's look at the... ready? Bits!

```js
  0110 1011 1000 1110 0010 0011    // => 0x6B8E23
& 0000 0000 0000 0000 1111 1111    // => 0xFF
  -----------------------------
  0000 0000 0000 0000 0010 0011
```

Uff, that's a bunch of zeros and ones! But notice what is happening, when we `&` the original number with our "mask", all the places where _both_ the original `1` and our mask are `1` result in `1`. In the places where our mask is `0` the result is `0` regardless.

It's like multiplying! Which is exactly right! Bitwise AND can be _sort of_ thought of as multiplication in boolean algebra, while bitwise OR can be thought as addition.

As you might have noticed, writing number in binary is tending towards the painful side of things. Let's start using the hexadecimal number system, or hex for short to both, save some typing and possible errors. A hex number let's us represent each group of four bits (a nibble), with one number/letter between `0` and `F`. So, from our color above you can see how each nibble (4 bits) represent one number/letter on the hex number (`3 == 0011`, `2 == 0010`, `E == 1110`, and so on).

Awesome, let's keep going, how about getting the green value?

```c
0x6B8E23 & 0xFF00 // => 0x8E00
```

Well, that's progress, we are able to get `8E` alone, but there are two extra `00` there. How do we get rid of them? This is the Ninja part!

### Shift like you are driving manual! 🏎️

Among the bitwise operators there are these curious looking `<<` and `>>` operators. Initially what they do might seem obscure. I mean with a description like this from [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift):

> The left shift (<<) operator returns a number or BigInt whose binary representation is the first operand shifted by the specified number of bits to the left.

It's accurate, terse, and initially left me like, _wat_?

But let's look what it does, maybe we can spot a pattern or something.

```c
1 << 0 // => 0000 0001
1 << 1 // => 0000 0010
1 << 2 // => 0000 0100
1 << 3 // => 0000 1000
1 << 4 // => 0001 0000
1 << 5 // => 0010 0000
```

Did you see that? All that that operator is doing is shifting to the left the `1` on the left by the number on the right. Not bad!

As you might have guessed we can shift something else than `1`, say, `6` (0110) and it would shift that whole number too.

```c
6 << 0 // => 0000 0110
6 << 1 // => 0000 1100
6 << 2 // => 0001 1000
6 << 3 // => 0011 0000
6 << 4 // => 0110 0000
6 << 5 // => 1100 0000
```

And we can do it reverse too!

```c
0010 0000 >> 1 // => 0001 0000
0010 0000 >> 2 // => 0000 1000
0010 0000 >> 3 // => 0000 0100
```

With this now we know how to get rid of the extra 0s in `0x8E00`!

```c
0x8E00 >> 2 // => 0x2380
```

Wait, what? (I spent and embarrassingly amount of time trying to figure this one out...)

Remember the nibbles up there? how four bits represent one digit in hex? That means that to get rid of one `0` in hex we need to get rid of 4 bits. And thus, to get rid of a whole nibbles we'd need to shift in multiples of 4.

```c
0x8E00 >> 4 // => 0x8E0 --- closer!
0x8E00 >> 8 // => 0x8E  --- let's go!!
```

Ok, let's recap super quick where are we, we can use `&` to mask out the stuff that we don't want from a number, and then we can shift away the number that we don't want. Thus in order to get the green value out of `0x6B8E23` we would do:

```c
(0x6B8E23 & 0x00FF00) >> 8 // => 0x8E

(0x6B8E23 & 0xFF0000) >> 16 // => 0x6B
```

That's neat! Now we can very easily get our values for our hex CSS ro rgb function

```js
let hexColor = 0x6b8e23;

let r = (0x6b8e23 & 0xff0000) >> 16;
let g = (0x6b8e23 & 0x00ff00) >> 8;
let b = (0x6b8e23 & 0x0000ff) >> 0;

console.log(`the rbg value is rgb(${r}, ${g}, ${b})`);
// the rbg value is rgb(107, 142, 35)
```

Et Voilà!

There's definitively a lot more to binary an bitwise operators, we just learned a little bit (or a nibble... I'm so sorry) of the chopping part, we can stick them together (imagine another ridiculous task to convert all the rgb values to hex 🤦‍♂️), we can... well, do more, but chopping and sticking stuff is enough for a [CHIP8 emulator](/blog/the-adventures-of-writing-a-chip8-emulator-part-2).

See you on the next time!
