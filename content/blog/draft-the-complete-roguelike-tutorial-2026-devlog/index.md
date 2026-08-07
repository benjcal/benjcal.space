+++
title = "[DRAFT] The Complete Roguelike Tutorial 2026 Devlog"
description = ""
date = "2026-08-07"
draft = true
+++

Alright, let's learn some video game programming!

This year I'm doing [*The Complete Roguelike Tutorial*](https://www.reddit.com/r/roguelikedev/comments/1vd9noj/roguelikedev_does_the_complete_roguelike_tutorial/) in the roguelikedev subreddit, which is based on [this](https://rogueliketutorials.com/tutorials/tcod/v2/) tutorial. What I'm excited about is the convergence of a couple of things: video game development, something that I've been curious about for a long time, roguelike games, which I casually enjoy, and a cool community, because it is always more fun (and more likely to do stuff) with other people! Here is the [repo](https://github.com/benjcal/roguelikedev-2026).

Anyways, for the uninitiated, roguelike is a genre of video games that are like the game Rogue (how surprising!). They are usually characterized by being notoriously difficult and brutal, permadeath games! It doesn't matter if you've spent 7 hours carefully and meticulously going down 7 levels in a dungeon, you died on the 8th and there's nothing left, nothing saved, no retries... you just died... you can start a new game with a new random seed in level 1. Uff!

This week was Part 0 and 1 of the tutorial, so without further ado, let's jump in!

### Part 0 - Setting up

I started this with the attitude of taking it easy, follow the process, do only the weekly part, and share and have fun, instead of like throw a few focus hours, do 7 parts in one day, and then never look at it. So like, I'm actually interested in following through and complete a full game of my own, even if it's just a generic tutorial game. I believe that there is something valuable in learning game programming, some things that I suspect, and some others that I don't know yet... but anyways, that was the attitude, let's put the "experienced engineer" aside for a bit, and take a curious beginner attitude.

And... it's gone! Right in day 0 during the setup they are sharing how to write a hello world in Python and install `tcod`, the main library this tutorial is based on. A quick search took me to the repo of the library, which is actually called [libtcod](https://github.com/libtcod/libtcod) and is written in C++. Well, what do you know, I love C++, especially C++23 with such niceties as `std::println` and `std::variant` and `std::optional`!

So then, we throw the whole day 0 out and set this up in C++23. One characteristic of C++ is that it lets you do almost anything in as many ways as you can imagine! you have a choice of compilers, build systems, dependency managers, linters, static checkers, code formatters, and whathaveyou! My favorite tools at the moment are CMake with CPM.cmake for package management, clangd as my LSP, and since I can never remember the cmake commands I use `just` as a command runner so I can run commands like `just run` or `just clean` and be on my merry way :-) A quick note about C++ build and dependency management might be interesting here. I've used Meson in the past and it is such a lovely build system! Notable users are GNOME and GTK, which is how I became familiar with Meson while learning GTK4. The thing though is that meson is a lot less common than CMake and maybe there's a way, but I haven't spent too much time learning how to use projects that use CMake as a build system (like libtcod in our case) to work with Meson.

But even though CMake might not have the niceties like `meson init` and such, it makes up for them in being used almost EVERYWHERE! I used to be afraid of the spells and incantations in a `CMakeLists.txt`, but they are not really scary once you actually decide to learn them. I found this [YouTube playlist](https://youtube.com/playlist?list=PLalVdRk2RC6o5GHu618ARWh0VO0bFlif4) that made things click for me. But you can think of a `CMakeLists.txt` file kind of as source code that calls a bunch of functions to configure your project. Idk if I'm doing a good job at explaining the concept I have in mind, but imagine you have source code that all you do is call functions provided by some library to do something, that's kind of all a CMakeLists.txt file is — you call a bunch of CMake functions to tell it what you want it to do with your source code.

Now, a word about C/C++ dependencies. When all that you've been exposed to is something like Python or Go, or npm, or Java, even though the access to dependencies that you have there is impressive, it is dwarfed by the ridiculous amount of libraries you can use in C/C++! The world is written in C/C++! Even your famous python libraries like numpy and pandas are written in C/C++. Now, I don't want to start a holy war about programming languages, but just search in your package manager for `lib*` and pretty much everything you see there is a C or C++ library. Pretty cool, right?

Now, those `lib*` in your package manager are one way to access C/C++ libraries, another is to use a dependency manager like CPM.cmake or vcpkg. I've used both and certainly have an affinity towards CPM.cmake for how clean and straightforward it is to use!

But CPM.cmake is only for one type of dependency. When it comes to C++ I usually take a tiered approach to dependencies. The foundational ones, like GLFW, or SDL3 (which is used in this project) or GSL or libzstd or libpng for example, I'm fine using those from my system, that is my package manager \*-dev packages.

The second group are single-header libraries, which are exactly what they sound like. Take a single file, put it in your codebase and that is all! No lock files, no supply-chain attacks, no dependency management or version conflict resolution, one file and you are good to go! The quintessential examples of libraries like this are [stb_*](https://github.com/nothings/stb) but you also have other nice ones like nuklear or [cereal](https://uscilab.github.io/cereal/)

I really enjoy single header libraries! I've even dabbled in making [my own!](https://git.sr.ht/~benjcal/bc_libs/tree/main/item/bc_buffer.h). You learn, encapsulate that knowledge in a single-header library, and now you've added a new tool to your toolbox! It's kind of like in woodworking you make your life easier by using your woodworking tools and skills to make new tools! 3D printing has the same characteristic of meta-improvements!

Anyways, the final set of dependencies in the hierarchy are those for which I use CPM.cmake or vcpkg, they are a bit heftier than a single header, might not be easily accessible in my package manager, or I might want the newest releases. Notable examples I've used in other projects are JUCE, SFML, ImGui and TA-lib. Those dependencies usually have a few source files and headers and such as to make them annoying to vendor.

But how do you choose which one to put where? This project presented a perfect example. `libtcod` had instructions for how to configure CMake to fetch the library. Those configurations not only fetch libtcod but its dependencies, so when I originally fetched it, it all worked but it took too long to compile... after a quick inspection, the thing was compiling the whole SDL3 library! Well, that one was an easy one, I can install the development packages for SDL3 from my package manager and use those! and so I did. So, if it is something "heavy" I first look for using shared libraries and development packages. If it's medium, it is a candidate for CPM.cmake and if it is a single header library I can either vendor it or use CPM.cmake as well... And as you'll notice, as with most things C++, you almost always have a ton of options regarding how you can do things. That might seem like a negative for some and if using this in a team, strong conventions would need to be decided, but for me it's just fun! Being able to weigh the pros and cons, tradeoffs and such, and then have my project the way I want it is part of what makes programming fun for me!

### Part 1 - Drawing the '@' symbol and moving it around

Anyways, after completely ignoring Part 0 and doing my own thing, we come to Part 1. Since I've decided to "follow" this tutorial in C++ instead of python I'm aware I've signed up for translating python idioms and libtcod APIs to C++.

Most of the things in the tutorial translated pretty close to C++ and getting Part 1 of the tutorial running was pretty uneventful except for this line:

```c++
while(true) {
    ...
}
```

Wait a second, I thought that infinite loops were bad! Well turns out that when you start working with computers at lower levels they kind of fundamentally work in an infinite loop. You see, your CPU is kind of like an eager dog that you just hinted that you are going to take him for a walk... and he is like "now? is it now? no, I bet it is now? ok, now for real? now? now? now?"

Your computer, your operating system, the "server" from where you loaded this website is kind of constantly asking "is there something to do? is there something to do? is there something to do?" and that CPU utilization thing at 8% is saying that 92% of the time the answer to the CPU's question of whether there's something needed to do is nop — actually, the answer is a `nop` operation in most CPU architectures! except that in contrast with your dog who asks if it's time to go out every two seconds, your computer asks if there's something it needs to do about 4.4 billion times per second on my machine! There's a lot more nuance to this, interrupts and CPU frequency scaling and whatnot, but as a mental model that is kind of how your computer works and in that sense, game development is very quaint in how it kind of resembles low-level computer programming.

This infinite loop asks over and over again, has anything happened? and since we haven't implemented  any events yet all it does is draw the "@" symbol on the screen over and over again. You might think this is inefficient... but "premature optimization is the root of all evil", so let's stick with the tutorial :-) But at the same time, I've never heard a gamer saying "my game is running at 300 fps, that is so inefficient!", even though frames per second is nothing but how long it takes for the loop to complete (there's more nuance, sometimes one wants to limit the framerate or sync it with the monitor's refresh rate, which is what `vsync=true` does).

Now, if nothing ever happened our infinite loop would always do the same thing, that is to say, nothing new would ever happen, and that is where events come in!

Events can be a variety of things. Think about the games you've played. An event can be that you did something, pressed a key or moved the mouse, but an event can also be that time passed, or that, in a multiplayer game, somebody did something and on your side the event is a network packet with what somebody else did. The point is, everything that can happen in a game we think of it as an event. So logically there are a couple of things we want to know about an event. What type of event was it? was it a key press? a mouse movement? and then we want to know details about the event, if it was a keypress, was it just pressed or just released? what key was it? were there any modifiers pressed when the key was pressed? (Ctrl, Alt, Shift, etc). If it is a mouse movement, how much did it move? what was the ending position? was a button pressed (drag?) and so on... As you can see, event handling is rather important!

A quick aside, web development, specifically backend and web servers are also event driven, it just so happens that we have so many levels of abstraction there that we actually never see the infinite loop but when you run

```js
app.listen(3000)
```

in express.js, that starts an infinite loop and the events are HTTP calls and they are handled by your controller in an MVC pattern.

In the python version of `tcod` there are such things as tcod events, in C++ tcod doesn't handle events, one handles them directly with SDL3. Luckily, I've [used](https://benjcal.space/blog/the-adventures-of-writing-a-chip8-emulator-part-1/) [SDL](https://benjcal.space/blog/the-adventures-of-writing-a-chip8-emulator-part-2/) [before](https://benjcal.space/blog/because-i-cant-ever-remember-sdl/) so this was familiar territory.

For the most part handling inputs is pretty straightforward. You have some way to know what input is the one you have and then you respond with what should happen when that input occurs. I've seen input handling in Raylib, GLFW, SFML, Love2D, SDL, JavaScript listeners, and GPIOs in micro controllers, and except for the MCU in which you need to deal with such annoying things as physics, once I've done it in one, they all are very similar.

What is more interesting is how you organize your code around those events! As you are working on a game, your events — or what happens in them — will get more and more complicated as you go on. First, when you press the down key the player simply moves down... but later you'll want to deal with stuff like, is there a wall in the way? is the character frozen? does it have a speed bonus so that the movement is faster? If all of that is done inside an `if (key_down) {...}` you can imagine how messy and error-prone that if statement is going to get! And honestly, this is the part that I'm the most curious about learning game development! Games seem to use a design pattern called [Entity Component System (ECS)](https://en.wikipedia.org/wiki/Entity_component_system) which is one of the principal reasons why I want to learn game development! It seems like a very powerful way to think about and organize complex interacting parts. I know very little about it but lately I've been realizing how useful and powerful design patterns can be, and this one is one that I want to get under my belt. And doing so while making a video game sounds like a doubly good thing!



### Postlude 1: Community

What really caught my attention from this is less the tutorial, or even the type of game, although when I'm happy but want to feel frustrated I've been known to open a Roguelike game! But, the attractive element of this is the community! Not like I have interacted a ton with the community but I've been a lurker for years and they seem like a cool bunch! But even beyond that, something I struggle is finishing stuff when by myself, even stuff that I know I _want_ to finish. I've come to realize that I'm a lot more likely to do something, if I'm not alone in it, or if I have an external structure. Heck, I've been wanting to deepen my math maturity, tried quite a bit by myself, and given up. Ended up enrolling in a community college course, and actually finished (and enjoyed!) Calculus 1 and 2! The point is, body-doubling, accountability, or just straight up knowing that my wife is around, is enough for me to actually do stuff that I want to do vs watching tons of YouTube and then next thing I know is 11 PM and I've got stuff to do the next day! 🤦‍♂️

I remember talking with a friend some time ago... when you are in a room full of people, you can be silent, but you are still there, you occupy space, you exist in that room and in some way you are part of what is happening in that room. On the internet, picture a chatroom, you can be part of that but if you don't say anything, if you don't interact, well, you don't really exist in that group. This can be rather tough for introverts. Who am I with the gall to dare think I have something to say? Well... you are you, which makes you unique, which makes what you want to say unique! Nobody has the combination of experiences, memories, skills, etc, that you have! So, say something! exist!

The bonus of the internet though is that, although in a room full of people it might be challenging to find people with similar interests, on the internet with the millions of people online, we have a high chance of finding weirdos like us! And that is community!

Uff, long rant there... but anyway, what is special about this event for me is the two-fold bonus of me wanting to learn video game development and not doing it alone (I've tried before... got nowhere). K, 'nuff about that.

### Postlude 2: On boring tech

In case you are still thinking about old C++, let me show you how a modern C++23 hello world looks like

```c++
#include <print>

auto main() {
    std::println("Hello {}", "world");
    return 0;
}
```

The tutorial uses a library called [libtcod](https://github.com/libtcod/libtcod) which is... well, I'm still learning it. But they use it in Python. Well, with all due respect to Python, I want to do this in C++. You see, lately I've been doing some heavy computation work processing A LOT of data, and I needed a language that was very fast, had access to almost every library imaginable, and was expressive enough to convey many concepts and ideas in code.

As I looked around, C++ fit the bill. Now, this language is a language that people love to hate, and I can see why. You can do the same thing in C++ in probably a dozen ways. The language is HUGE and has overlapping features and rough edges. It has different support between compilers and a bunch of obscure "principles" like RAII and "smart pointers".

So, a way to see it is, this language gives the developer A TON of creative freedom! You can do most of what you can think of in C++, including very dumb things. As contrast, a complete opposite of this language would be Golang. Go goes out of its way to enforce only one way of doing things (i.e. there's only one loop, `for`, no `while`, no `do while`, no iterator pattern, no `.forEach()`. That can be limiting, but when working with a team, it is pure bliss! The creativity is great for an individual, but when multiple people, with varied backgrounds come together to try to make one thing in common, creativity can be quite annoying. In C++, you can "know" C++ and then look at somebody else's code and have no clue what is happening because they are using some feature you don't know... and there are A LOT of those! but with Go? All go code looks the same! different names and functions and whatever, but all the code looks the same! Did you know that having a wrong name, using incorrect indentation or an unused variable all are compiler errors in Go? _chef kiss_. Your code won't even run if you called something `this_thing` instead of `thisThing`

But we are talking about C++, not Golang. I like C++ because in a codebase that I fully control I get to choose what features I use and which ones I don't. I get to choose what patterns to implement in my code, what libraries, how to build the thing, which compiler, what formatting to enforce... I have a lot of power, and I like it!

### Postlude 3: On the feeling

Remember that feeling that time when you wrote incantations into text pad and then some more spells into a black window with white letters and then the computer responded to you? What's it called, fun? Remember last time you felt that while coding!? Well, I want some of that!
