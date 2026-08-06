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

As you can imagine, what happens inside that infinite loop can't take forever, because *that* would be the infinite loop bug, in which your program is stuck doing nothing... at any rate, let's talk about the event (the reddit one, not the events that are handled in an infinite loop!)

A quick aside, web development, specifically backend and web servers are also even driven, it just so happen that we have so many levels of abstraction there that we actually never see the infinite loop but when you run

```js
app.listen(3000)
```

in express.js, that starts an infinite loop and the events are HTTP calls and they are handled by your controller in an MVC pattern.

Anyways, for the uninitiated, roguelike is a genera of video games that are like the game rogue (how surprising!). They are usually characterized for being notoriously difficult and brutal, permadeath games! It doesn't matter if you've spent 7 hours carefully and meticulously going down 7 levels in a dungeon, you died on the 8th and there's nothing left, nothing saved, no retries... you just died... you can start a new game with a new random seed in level 1. Uff!

The community if following [this](https://rogueliketutorials.com/tutorials/tcod/v2/) tutorial, which seems ok, but form the very begining I already started doing my own thing...

### C++ is cool again

The tutorial
