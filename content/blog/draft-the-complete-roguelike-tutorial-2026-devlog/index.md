+++
title = "[DRAFT] The Complete Roguelike Tutorial 2026 Devlog"
description = ""
date = "2026-08-06"
draft = true
+++

Let's learn some video game programming!

This is something that I've been wanting to do for a while. Video games are fun and I've always wanted to know how they are made, and how can I bring my ideas into a cool fun interactive experiences. But also, I think it'll teach me some very interesting and useful programing techniques.

You see, games sort of fall in the category of even driven programming, like, something happens and the game does something. That something can be time passed, or the player pressed a key or a network packet was received, and the game reacts to those events in a predetermined way.

All of this happens in an infinite loop (and we were told that infinite loops were bad!). And in that sense is quite similar to another of my passions, embedded development. In a microcontroller one does the same, get a `while(true)` going and then put everything inside it.

As you can imagine, what happens inside that infinite loop can't take forever, because _that_ would be the infinite loop bug, in which your program is stuck doing nothing... at any rate, let's talk about the event (the reddit one, not the events that are handled in an infinite loop!)

A quick aside, web development, specifically backend and web servers are also even driven, it just so happen that we have so many levels of abstraction there that we actually never see the infinite loop but when you run

```js
app.listen(3000)
```

in express.js, that starts an infinite loop and the events are HTTP calls and they are handled by your controller in an MVC pattern.

Anyways, for the uninitiated, roguelike is a genera of video games that are like the game rogue (how surprising!). They are usually characterized for being notoriously difficult and brutal, permadeath games! It doesn't matter if you've spent 7 hours carefully and meticulously going down 7 levels in a dungeon, you died on the 8th and there's nothing left, nothing saved, no retries... you just died... you can start a new game with a new random seed in level 1. Uff!

The community if following [this](https://rogueliketutorials.com/tutorials/tcod/v2/) tutorial, which seems ok, but form the very begining I already started doing my own thing...

### C++ is cool again

In case you are still thinking about old C++, let me show you how a modern C++23 hello world looks like

```c++
#include <print>

auto main() {
    std::println("Hello {}", "world");
    return 0;
}
```

The tutorial uses a library called [libtcod](https://github.com/libtcod/libtcod) which is... well, I'm still learning it. But they use it in Python. Well, with all due respect to Python, I want to do this in C++. You see, lately I've been doing some heavy computation work processing A LOT of data, and I needed a language that was very fast, had access to almost every library imaginable, and was expressive so that I could express many concepts and ideas in code.

As I looked around, C++ fit the bill. Now, this language is a language that people love to hate, and I can see why. You can do the same thing in C++ in probably a dozen ways. The language is HUGE and has overlapping features and rough edges. It has different support between compilers and a bunch of obscure "principles" like RIIA and "smart pointers".

So, a way to see it is, this language gives the developer A TON of creative freedom! You can do most of what you can think of in C++, including very dumb things. As contrast, a complete opposite of this language would e Golang. Go goes out of its way to enforce only one way of doing things (i.e. there's only one loop, `for`, no`while`, no `do while`, no iterator pattern, no `.forEach()`. That can be limiting, but when working with a team, it is pure bliss! The creativity is great for an individual, but when multiple people, with varied background come together to try to make one thing in common, creativity can be quite annoying. In C++, you can "know" C++ and the look at somebody else's code and have no clue what is happening because they are using some feature you don't know... and there are A LOT of those! but with Go? All go code looks the same! different names and functions and whatever, but all the code looks the same! Did you know that having a wrong name, using incorrect indentation or an unsued variable all are compiler errors in Go? *chef kiss*. Your code wont even run if you called something `this_thing` instead of `thisThing`

But we are talking about C++, not Golang. I like C++ because in a codebase that I fully control I get to choose what feature I use and which ones I don't. I get to choose what patterns to implement in my code, what libraries, how to build the thing, which compiler, what formatting to enforce... I have a lot of power, and I like it!

###
