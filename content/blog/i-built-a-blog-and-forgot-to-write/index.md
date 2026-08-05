+++
title = "I Built a Blog and Forgot to Write"
description = ""
date = "2026-08-05"
draft = true
+++

Hello there! It’s been a while since I last wrote something 🙃.

Part of it was just life getting busy, but I think a bigger factor was how hard I made it for myself to write anything. You see, as a proper engineer I had the most efficient personal blog. The content was written in markdown, made into a static site using `11ty`, filled with custom scripts to process images and videos, custom fonts CSS, nice clean templates and hand-crafted theme, and scripts to deploy everything with a single `npm` command.

Well, it was perfect, minimalist, fast, very aesthetically pleasing for me (that is, the codebase). Except that I didn't write anything. It was too hard. I had to make a new folder inside `_content/` and then a `.md` file named the same as the parent folder (have you seen how ugly 5 `index.md` tabs look? not knowing what is what?).

And then inside the markdown I had to add a front matter with a slug with the same name as the parent folder _and_ filename. You can already see how stuck I felt doing even something as simple as changing the title of a post.

But then came handling images or videos: how big are they? what is the correct `![image.png]` to write? did I place images in the global `/images` folder or are they siblings with the post?

Ugh!

By the time I was done with all of that I had already forgotten what I wanted to write about.

So then the issue was _obviously_ `11ty`. If only I had _more_ control over how things work so that I could fine-tune everything exactly the way I wanted it... YES! I'll build my own static site generator. How hard can it be!? (famous last words...)

So I did, or rather, so I started and never finished... 

I thought that a clean UNIX-philosophy static site generator would do: `pandoc` can convert markdown files to HTML, some `bash` scripts to iterate through my markdown files, inject some CSS and bob's your uncle. But wait. How do I make an index page listing all the article titles and dates and sort them? well I need to read the front matter for all the posts. But wait, how do I generate an RSS/Atom feed? maybe a template? I need the data from the front matter of the posts for this _and_ a templating engine. How do I filter to exclude drafts? how do I serve? can I have hot reload?

Yeah, how hard can it be!

But then I realized something: I was mixing up the process of building an efficient, performant, featureful blogging engine with the goal of writing posts! 🤦‍♂️

##### Process vs Results

This might be obvious to some of you but it wasn't for me until recently: in life there are things I care about the **_process_** and others that I care about the **_results_**, and mixing the two has caused me so much pain.

Two examples, 3D printing and Linux.

I got into 3D printing a few years ago. It was so fun to be able to imagine physical objects, see them on a screen and then have them as actual objects in the world. I printed so many useful things to organize my office, showcase my mechanical keyboards, hold the keys and paper towel, all kinds of cool things. But then, as a proper tinkerer, I wanted more control over my 3D printer. So I swapped out the main board, flashed a custom firmware, connected a Raspberry Pi to it, added a webcam, tweaked the motors and added some extra sensors... but completely lost my interest in 3D printing...

You see, 3D printing became so hard: what was that local DNS I assigned to the 3D printer RPI? what nozzle does it have at the moment? is the RPI even on? the local website of the custom firmware is not responding, the filament is not sticking, did I run that bed leveling thing and copy/pasted the values into the calibration thing?

The whole thing went from putting an SD card in the 3D printer and printing, to a whole bunch of steps because of all the control I had. Sure, my 3D printer was arguably more powerful, but at the cost of so much more complexity. And I've now realized that regarding 3D printing, I couldn't care less about the process. I just want the prints.

With Linux the story was a bit similar. I've used Arch since forever. It is an awesome distro where all the newest OSS software lands first. You can customize it to your heart's content, to the point of knowing exactly how many processes are running after boot, have a full working system with like 400MB of ram usage, and having your own [rice](https://www.reddit.com/r/unixporn/) with everything just perfect, just precisely pixel perfect.

That was fun and all until I had to do something productive with my computer! Then the custom stuff just became friction. _X_ needed some service running to share screen, and _Y_ didn't work with a tiling window manager. I also needed to add a script to launch _Z_ because my custom launcher didn't recognize the `.desktop` files the program came with...

I installed Fedora and everything just worked. It was awesome. Again I had confused wanting the process vs wanting the results.

I think there's more nuance to it, but as a tinkerer/maker/engineer/hacker/what have you, I'm used to enjoying the process: building the thing, knowing how it work under the hood, being in full control and the ~~power~~ mastery it entails, realizing a vision, overcoming difficulties, learning new things and bending the computer/device/situation to my will.

All of that is great, but when embarking on something new, knowing if I'm embarking on it for the process/journey or for the results has been saving me some headaches lately. As an example, I'm currently picking up Linear Algebra. The journey is arduous but I'm doing this for the results. I need this to better understand Statistical Learning. On the other hand, I'm also learning Real Analysis. It could be useful someday, but I'm doing it because I love the journey. Analysis is beautiful and elegant, infinite series are weird and mysterious (Fourier series are straight up wizardry!), Euler was an absolute genius, the landscapes are gorgeous, and I'm in it for the journey!

##### Concessions

So then, here I am actually writing! This blog is still by any measure nerdy and opinionated, it is still static site generated by Zola static site generator, still deploying to Bunny by GitHub actions... but now I don't care that much about the aesthetics of the codebase. I'm using Sveltia CMS to manage content. So I went from creating a file, wrangling front matter, `index.md` tab archeology (the bunch of `index.md` are still there... I just don't see them!) to a textbox on a website! Write some text, see a preview, drag and drop images, and publish. It went from a "project" to a "text-box". Sure it seems like something small, all of this just to say that you are now using s CMS? but the fact is that I'm actually writing again 😃!

---

This year I decided to participate in [The Complete Roguelike Tutorial 2026](https://www.reddit.com/r/roguelikedev/comments/1vd9noj/roguelikedev_does_the_complete_roguelike_tutorial/) on Reddit, because I've never completed a game... and I want to know how that works. (read, process :-D ) I'll likely be posting about that soon!
