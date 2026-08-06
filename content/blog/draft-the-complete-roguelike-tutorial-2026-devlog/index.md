+++
title = "[DRAFT] The Complete Roguelike Tutorial 2026 Devlog"
description = ""
date = "2026-08-06"
draft = true
+++

Alright, let's learn some video game programming!

Remember that feeling that time when you wrote incantations into text pad and then some more spells into a black window with white letters and then the computer responded to you? How is called, fun? Remember last time you felt that while coding!? Well, I want some of that!

Here's the map of the land... let's talk about a little about the event, the conceptual framework for a game program, technical choices, project structure, and lessons learn from day 0 and 1 of the tutorial, and above all, let's have fun!

### The event

There's not a lot to say about the event that is not in [the announcement]([https://www.reddit.com/r/roguelikedev/comments/1vd9noj/roguelikedev_does_the_complete_roguelike_tutorial/](https://www.reddit.com/r/roguelikedev/comments/1vd9noj/roguelikedev_does_the_complete_roguelike_tutorial/)). What really called my attention from this is less the tutorial, or even the type of game, although when I'm happy but want to feel frustrated I've been known to open a Roguelike game! But, the attractive element of this is the community! Not like I have interacted a ton with the community but I've been a lurker for years and they seems like a cool bunch! But even beyond that, something I struggle is finishing stuff when by myself, even stuff that I know I _want_ to finish. I've come to realize that I'm a lot more likely to do something, if I'm not alone in it, or if I have an external structure. Heck, I've been wanting to deepen my math maturity, and tried quite a bit by myself, and giving up. Ended up enrolling in a community college course, and actually finished (and enjoyed!) Calculus 1 and 2! The point is, body-doubling, accountability, or just straight up knowing that my wife is around, is enough for me to actually do stuff that I want to do vs watching tons of YouTube and then next thing I know is 11 PM and I've got stuff to do the next day! 🤦‍♂️

I remember taking with a friend some time ago... when you are in a room full of people, you can be silent, but you are still there, you occupy space, you exists in that room and in some way you are part of what is happening in that room. In the internet, picture a chatroom, you can be part of that but if you don't say anything, if you don't interact, well, you don't really exists in that group. This can be rather thought for introverts. Who am I with the gull to dare think I have something to say? Well... you are you! which makes you unique, which makes what you want to say unique! Nobody has the combination of experiences, memories, skills, etc, that you have! So, say something! exists!

The bonus of the internet though is that, although in a room full of people it might be challenging to find people with similar interest, in the internet with the millions on people online, we have a high chance of finding weirdos like we! And that is community! 

Uff, long rant there... but anyway, what is special about this event for me is the two-fold bonus of me wanting to learn video game development and not doing it alone (I've tried before... got nowhere). K, 'nuff about that.

### Video Game Programming

From the tutorial (we'll get there soon enough) video games have this _main loop_ thing. Remember how we learned that infinite loops are bad in programming? Nah, now they are the thing we use! Kind of similar to in math, you can't divide by 0... then when you come to calculus it'd be like _'lol, sure we can know what is something divided by zero, at the limit!'._ At any rate a main infinite loop in which you do things is very similar conceptually to embedded development. You have the same component of a `while(true)` or `for(;;)` depending on if you are a vanilla or chocolate person... anyways, you have an infinite loop and then in it some things happen (events) that slightly change 










Outline

* about the event
* quick word about roguelike (maybe)
* tech choices, C++23 and CMake,CPM
* day 0 and 1 
* upcoming 

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

```c
++
#include <print>

auto main() {
    std::println("Hello {}", "world");
    return 0;
}
```

The tutorial uses a library called [libtcod](https://github.com/libtcod/libtcod) which is... well, I'm still learning it. But they use it in Python. Well, with all due respect to Python, I want to do this in C++. You see, lately I've been doing some heavy computation work processing A LOT of data, and I needed a language that was very fast, had access to almost every library imaginable, and was expressive so that I could express many concepts and ideas in code.

As I looked around, C++ fit the bill. Now, this language is a language that people love to hate, and I can see why. You can do the same thing in C++ in probably a dozen ways. The language is HUGE and has overlapping features and rough edges. It has different support between compilers and a bunch of obscure "principles" like RIIA and "smart pointers".

So, a way to see it is, this language gives the developer A TON of creative freedom! You can do most of what you can think of in C++, including very dumb things. As contrast, a complete opposite of this language would e Golang. Go goes out of its way to enforce only one way of doing things (i.e. there's only one loop, `for`, no`while`, no `do while`, no iterator pattern, no `.forEach()`. That can be limiting, but when working with a team, it is pure bliss! The creativity is great for an individual, but when multiple people, with varied background come together to try to make one thing in common, creativity can be quite annoying. In C++, you can "know" C++ and the look at somebody else's code and have no clue what is happening because they are using some feature you don't know... and there are A LOT of those! but with Go? All go code looks the same! different names and functions and whatever, but all the code looks the same! Did you know that having a wrong name, using incorrect indentation or an unsued variable all are compiler errors in Go? _chef kiss_. Your code wont even run if you called something `this_thing` instead of `thisThing`

But we are talking about C++, not Golang. I like C++ because in a codebase that I fully control I get to choose what feature I use and which ones I don't. I get to choose what patterns to implement in my code, what libraries, how to build the thing, which compiler, what formatting to enforce... I have a lot of power, and I like it!

###
