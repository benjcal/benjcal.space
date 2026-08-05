+++
title = "Writing about writing..."
description = ""
date = "2026-08-05"
draft = true
+++

Hello there! It’s been a while since I last wrote something 🙃.

Part of it was just life getting busy, but I think a bigger factor was how hard I made it for myself to write anything... You see, as a proper engineer I had the most efficient personal blog! The content was written in markdown, made into a static site using `11ty`, full with custom scripts to process images and videos, custom css for fonts, nice clean templates and hand crafted theme, and scripts to deploy everything with a single `npm` command!

Well, it was perfect, minimalist, fast, very aesthetically pleasing for me (that is, the codebase)... except for the fact that I didn't write anything! It was too hard! I had to make a new folder inside `_content/` and then a `.md` file called the same as the parent folder (have you seen how ugly 5 `index.md` tabs look like? not knowing what is what!?).

And then inside the markdown I had to add a front matter with a slug with the same name of the parent folder _and_ filename! You can already see how I felt stuck to do even something as simple as change the title of a post! 

But then we came to handling images or videos... how big are they? what is the file name to write the `![image.png]` correct. Did I placed images in the global `/images` folder or are the siblings with the post? 

Ugh!

By the time I was done with all of that I had already forgotten what I wanted to write about!

So then the issue was _obviously_ `11ty`! If I had **_more_** control over how things work so that I could fine tune everything exactly the way I wanted it... YES! I'll build my own static site generator! How hard could it be!? (famous last words...)

So I did, or rather, so I started and never finished... 

I thought that a clean UNIX-philosophy static site generator would do... `pandoc` can convert markdown files to html, some `bash` scripts to iterate through my markdown files, inject some CSS and bob's your uncle! But wait... how do I make an index page listing all the article titles and dates and sort them? well I need to read the front matter for all the posts... but wait, how do I generate an RSS/Atom feed? maybe a template? I need the data from the front matter of the posts for this... how do I filter to exclude drafts? how do I serve? can I have hot reload?

Yeah... how hard can it be!

But then I realized something... I mixing up the process of building an efficient, performant, feature-full blogging engine with the goal of writing posts! 🤦‍♂️

##### Process vs Results

This might be obvious to some people but it wasn't for me until recently... in life there are things I care about the **_process_** and other that I care about the **_results_**, and mixing the two has caused me so much inflicted pain! 

Two examples, 3D printing and Linux.

I got into 3D printing a few years ago, it was so fun to be able to see things on a screen and then have then as physical objects in the world! I printed so many useful things to organize my office, showcase my mechanical keyboards, hold the keys and paper towel... all kind of cool things! But then I wanted, as a proper tinkerer, I didn't have enough control over my 3D printer. So I swapped out the main board, flashed a custom firmware, connected a Raspberry Pi to it, added a webcam, tweaked the motors and added some extra sensors... and completely lost my interest in 3D printing...

You see, 3D printing became so hard! What was that local DNS I assigned to the 3D printer RPI? what nozzle does it have at the moment? is the RPI even on? the local website of the custom firmware is not responding, the filament is not sticking, did I ran that bed leveling thing and copy/pasted the values into the calibration thing?

The whole things went from put and SD Card in the 3D printer and print to a whole bunch of steps because of all the control I had... Sure, I could do A LOT more with my 3D printer now, but at the expense of complexity, and I realized that regarding 3D printing I couldn't care less about the process, I only cared about the results.

With Linux the story was a bit similar. I used Arch since forever! it is an awesome distro where all the newest OSS software lands first! You can customize it to your hearts contents, to the point of knowing exactly how many processes are running after boot, have your own [rice]([https://www.reddit.com/r/unixporn/](https://www.reddit.com/r/unixporn/)) with everything custom, just for you!

That was fun and all until I had to do something productive with my computer! Then the custom stuff just became friction... _X_ needed some service running to share screen, and _Y_ didn't work with a tiling window manager. I also needed to add a script to launch _Z_ because my custom launcher didn't recognized the `.desktop` files the program came with...

I installed Fedora and everything just worked, and it was awesome! Again I had confused wanting the process vs wanting the results.

I think there's more nuance to it but as a tinkerer/maker/engineer/hacker/what have you I'm used to enjoy the process, know how things work under the hood, the awesome feeling of control and mastery about realizing a vision, overcoming difficulties, learning new things and bending the computer/device/situation to your will!

That is great, but when embarking on something new, knowing if I'm embarking it for the process/journey or for the results has been saving me some headaches lately! As an example, I'm currently picking up Linear Algebra. The journey is arduous but I'm doing this for the results, I need this to understand better Statistical Learning. On the other hand, I'm also learning Real Analysis, and that has a potential to be useful and have some result, but I'm doing it because I'm loving the journey! Analysis is beautiful and elegant and I'm in it for the journey!

I think an application of this can also be made to the much discussed LLM phenomena currently happening, specifically as it applies to software engineering.

I've come to realize that there are different levels or _care_ that I have for different kind of code in a codebase. Some part of the codebase I couldn't care less and thus I'm happy to give the LLM full discretion on implementation details, as long as I have a broad understanding that nothing is particularly dump, and that that code produces the results I want (i.e. passes the unit tests, the GUI renders properly). This is akin to using a library as a dependency. I don't know how many people read, say, the React code, before importing it and going on their merry way (now, blindly using dependencies has led to some [spectacularly](https://expertinsights.com/news/active-npm-supply-chain-attack-compromises-323-packages) [bad](https://www.securityweek.com/over-400-npm-packages-infected-in-chaindrop-supply-chain-attack/) [things](https://www.securityweek.com/1800-hit-in-mini-shai-hulud-attack-on-sap-lightning-intercom/)!).

But then there are part of the codebase that I positively care about implementation details, naming conventions, code formatting, and such pickiness that we devs develop through our career! There the LLM might be an editor, a brainstorming box, expert advisor, but there I'm driving. These tend to be areas that might deal with core competencies, areas that I posses domain knowledge/expertise, or just foundational data structures and algorithms that their API is to be used across the whole codebase. In this cases, the process, that is, how exactly are we processing this data, or reaching this decisions, or what have you is something I care!

But I digress...

This year I decided to participate in [The Complete Roguelike Tutorial 2026](https://www.reddit.com/r/roguelikedev/comments/1vd9noj/roguelikedev_does_the_complete_roguelike_tutorial/) on reddit, because I've never completed a game... and I want to know how that works! (read, process :-D ) I'll likely be posting about that soon!
