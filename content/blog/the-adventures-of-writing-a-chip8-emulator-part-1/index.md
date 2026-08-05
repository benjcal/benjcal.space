+++
title = "The Adventures of Writing a CHIP8 Emulator - Part 1"
description = "The is a post about writing a CHIP8 Emulator in C"
date = 2023-06-04
+++


A few days ago I decided to write a CHIP8 emulator. Why? Because it's [fun](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/full-text/book/book-Z-H-3.html)! As for a programming language, I decided to use C. Wait a minute, isn't that illegal? This might surprise you but, it is not! You are not forced to use Rust for all new projects henceforth! Seriously though, in the past couple of months I decided to actually learn C and it has quickly become my [absolute favorite language](https://news.ycombinator.com/item?id=35468376).

Another big reason for writing a CHIP8 emulator is because I truly enjoy _really_ understanding something deeply. With today's crazy complexity in software (I'd argue mostly unnecessary, but I digress), tons of levels of indirections, abstractions, solving most problems by adding _Yet Another NPM Package®_, and so on, emulating a system like CHIP8 with a language like C feels like a breath of fresh air.

Let's set our expectations, I'm not going to tell you how to write a CHIP8 emulator, or what to put on your pizza (!pineapple). It'd be like spoiling a really good book, or telling you the clue to solving an interesting puzzle, or telling you how to get the Master Sword in TOTK without letting you figure it out! If you ask me, I think you **should** write a CHIP8 emulator too, and have tons of fun doing it! What I plan to do is more like take you along a leisurely walk through my journey, show you the parts that I thought were particularly interesting, while encouraging you to look at the landscape for yourself, dig in and come up with your own favorite parts!

And thus, armed with [some](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/) [amazing](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM) [resources](https://github.com/Timendus/chip8-test-suite), I fired up [Microsoft Word](https://youtu.be/X34ZmkeZDos), made a `main.c` file, and with `gcc main.c -o chip8` I was good to go.

When I started this project I had a foggy idea of how a CPU works from reading a little about [assembly](https://github.com/hackclub/some-assembly-required), or for that matter, how a compiler/interpreter sorta kinda works from reading another [interesting book](https://craftinginterpreters.com/) but here's the TLDR;

- CPU reads instruction, also called opcode, from memory (fetch step)
- CPU interprets the instruction (decode step)
- CPU does what the instruction says (execute step)
- Rinse and repeat (until it crashes, of course, and you contact IT and they tell you to turn it off and on again...)

Sure, it's a bit more complicated than that, but that's enough to get one started.

### Fetch, or the thing you wish your cat did!

Let's break down those steps a bit more. First the CPU<sup>[1](#1)</sup> fetches an instruction from memory. But, how does the CPU know which instruction to read? Good question! Most CPUs have a register in it called Program Counter (PC) that keeps track of the memory location that the CPU should read the next instruction from. In the case of CHIP8 the PC generally has an initial value of `0x200`. That is, when you first turn on the CHIP8 it will read `0x200` from memory and do what that instruction says.

Whoa there, hold your horses! Register what!? (that was my question!) A register is simply a very small memory inside the CPU that the CPU uses to store data. For example if I'm going to add two numbers, the CPU needs to have access to the two numbers and then it also needs some place to put the results of adding those numbers. That's what the registers are used for. Btw, if you have heard about 32 bit, 64 bit, or even 16 bit CPUs, that's one of the things that it means, how many bits fit in its registers. CHIP8, if the name hasn't given it away, is an 8 bit CPU, so the registers can store 8 bits (or one byte) of data. If you are wondering why use registers when computers has tons of memory already? Well, the registers are A LOT FASTER than accessing memory. Also, the CPU can perform operations directly on them, for example, increment or decrement a register directly, `AND` or `OR` one register with another, and so on. Getting data from memory takes extra steps, time, and generally can't (at least in CHIP8) be manipulated directly.

Talking about registers and memory, let's talk about the groundbreaking features of the CHIP8.

- a whopping 4kB of memory
- 16 `V` registers, named `V0`, `V1` ... `VF`
- a 16 bit `I` register usually used to store a memory address
- the aforementioned `PC` register, also 16 bit
- a stack
- a 64x32 monochrome display
- other things that I don't know about yet because I haven't implemented them (hey, this is just Part 1 `¯\_(ツ)_/¯`)

If you are wondering how this looks in code, this is what I came up with.

```c
typedef struct {
    uint8_t  memory[4096];
    uint8_t  v[16];
    uint16_t i;
    uint16_t pc;
    uint8_t  stack[16];
    uint8_t  display[64 * 32];
} Chip8
```

There are other fields like `stack_top`, or a mysterious `display_image` that I left out and we might talk about later... but I said that I wasn't going to spoil this for you!

And while talking about a stack, if you are like me and have mostly done web development, and the sound of _"data structures and algorithms"_ makes you shudder, don't despair. A stack is pretty muck like an array in JavaScript but you only have two operations, you can `.push(item)` or `.pop()` something from it. And the way you do that when you don't have the niceties of a high level language is simply to have a variable that tells you how many items you have added to your stack (`stack_top`), which gets incremented when you `push` something to it, and decremented when you `pop` something from it. Some people call this behavior LIFO, but is much better to actually understand what it's going on than have a fancy language that impresses nobody.

Here's an example:

```c
int stack_top = 0;

push_to_stack(item1); // add item to index 0 (stack_top) and increment stack_top
push_to_stack(item2); // add item to index 1 (stack_top) and increment stack_top

// stack_top is 2

pop_stack(); // decrement stack_top and get stack[stack_top], or item2
pop_stack(); // decrement stack_top and get stack[stack_top], or item1

// stack_top is 0
```

### Decode and execute, or how to impress your manager 10 out of FF times!

Alright, remember the steps that CPU takes, mentioned, like, forever ago? Let's talk about the last two, that is, decode and execute. But for that we need to talk a little about CHIP8 programs. All they are is simple binary files, with instructions two bytes long (there can be data in there, but we don't need to worry about that). Now, before you run for the hills at the mention of binary, I promise, it's not as complicated as it sounds! Let's start by looking at a hex dump of a CHIP8 program.

```c
// 00e0 6101 6008 a250 d01f 6010 a25f d01f
// 6018 a26e d01f 6020 a27d d01f 6028 a28c
// d01f 6030 a29b d01f 6110 6008 a2aa d01f
// 6010 a2b9 d01f 6018 a2c8 d01f 6020 a2d7
// d01f 6028 a2e6 d01f 6030 a2f5 d01f 124e
```

If you have never seen a hex dump, it is simply a more readable way to see 1s and 0s, which is all that computers speak. Each character above represents 4 bits, that is `0` in hex would be `0 0 0 0` in binary and `0` in decimal, while `F` would be `1 1 1 1` in binary and `16` in decimal. You might have seen this in colors such as `#FFFFFF`being the color white, or `#FF0000` the color red. All those are hex numbers to represent the value of red, green, and blue in three bytes. You see, you know more binary than you think! Ok, back to the hex dump. One character (as in `e` in `00e0`) is called a "nibble" and two characters (or 8 bits) is called a byte. (I love how a nibble is... a small bite!)

If you want to understand more binary/hex, there's nothing like trying stuff, so pick up a [programmer calculator](https://github.com/alt-romes/programmer-calculator) and play around!

Another tip about binary is that sometimes you'll see some puzzling numbers like `0x80`... what does that mean? Well, if you look at that number in binary it is `1000 0000`, so all they really needed was the 8th bit to be a one, but writing `0x80` is more compact (and obscure) than other alternatives.

Anyways, back to our hex dump. Each CHIP8 instruction is 2 bytes long, or 16bit, or 4 nibbles or 4 characters on the hex dump above (isn't it great how you can say the same thing in so many ways?). That is, the first instruction would be `00e0` and the next one would be `6101`. Simple enough.

Now, the CHIP8 uses the leftmost nibble to identify what the instruction does. For example, if the instruction starts with `a` that means the CPU will set register I to the value of the following 3 nibbles. So our fourth instruction `a250` simply tells the CPU _"set the `I` register to `250`"_. That's it!

Another example, the `6...` family of instructions tells the CPU to set the register Vx to some value. Let's look at the second and third instruction to get an idea of what this means. `6101` is simply telling the CPU _"set `V1` (`1` comes from the 3rd nibble) to the value of 0c"_ while `6008` would mean _"set `V0` to the value of 08"_. You see, not too hard!

You can look around in other areas of the dump and you'll see other instructions just like that. On the third line, third instruction, could you guess what `a29b` means? Look at you reading binary like it's nothing! (It's an interesting conversation starter for talking with your manager about a raise... "So, the other day I was reading a hex dump, as one does...")

Anyways, I think that's enough for this post. On the next one I'll share some of my follies and blunders, how I made such an obscure bug that I ended up writing a debugger for my emulator, how to write a program that your OS will send a kill 9 signal (the way my wife tells it is, a kill signal is like asking somebody with an apple in their hand, "can you please drop the apple?"; a kill 9 signal is chopping off the hand!), and the joys (as in frustration, but the amazing satisfaction of cracking a hard nut!) of low-level graphics programming. :-)

See you on the next one!

---

<ol>
    <li id="1">technically CHIP8 is not a CPU, but that's a story for another day.</li>
</ol>
