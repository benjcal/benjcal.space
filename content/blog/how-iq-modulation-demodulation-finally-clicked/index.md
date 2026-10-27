+++
title = "How IQ Modulation/Demodulation finally clicked"
description = ""
date = "2026-10-19"
draft = true

[extra]
widget = true
+++


## Electricity is wizardry

Today I'm gonna wear my amateur mathematician, amateur ham radio, software eng, electronics enthisiats and hacker hats to try my hand at explaining IQ signals! 

If you've playes with SDR like the RTL-SDR dongle or some other SDR you've used IQ signals, and if you've tried to learn SDR proper one of the first things that is taight is IQ samples. Now, I've looked at this topic quite a few times over the last few years but somehow it didn't make any sense at all! It just seemed like Java classes, complexity for the sake of complexity!

You see, when one starts learning about DSP and sampling... or even without DSP, one learns about how waves or signals are stored in a digital format. When you read an analog voltage in an arduino or some other ADC you get a number depending on the voltage of the pin. Say you are sampling a 1.5 voltage and your ADC range is 3.3v 


ok, let's talk about radio, after all, R in SDR  is for Radio... anyways, electricity is straight up wizardry! You take some current and pass it through a wire and you can turn an LED on and some other cool stuff... but then you make that current move back and forth and if you do that fast enough the current leaves the wire altogether! 🤯 If that's not magic, Idk what it!


## AC is black magic!

Anyways, that is the foundation for almost all "wireless" everything, wireless charging, WiFi, Bluetooth, Satellites, Radios, Induction cooking, and so much more!

Now, so far all of this is current going one way: a battery pushing water down a tube. That's DC, and it's easy to see why it's useful, the water goes in one end and comes out the other. But the thing that jumps out of the wire is current going back and forth, AC, and at first glance that looks useless. If I push the water back and forth in the tube, nothing actually goes anywhere. What's the point?

Think about a saw. The blade comes back to where it started on every stroke, it doesn't go anywhere, and yet the cut deepens. The work isn't in the blade getting somewhere, it's in the stroke, and every stroke removes material. AC is the same idea: the current doesn't have to end up anywhere, it just has to keep moving, and the load takes energy on every half cycle. A resistor heats up on the way out and on the way back, a speaker pushes air out and pulls it back in, a transformer only works because the current keeps changing. DC is a delivery truck that drives to your house once. AC is a shuttle bus that passes fifty times a second, nothing piles up at the end of the line, but you get your package every time it stops.

And yeah, that saw needs teeth on both edges to cut on both strokes. Teeth on only one edge would do half the work, which is basically what a diode does to AC.

<figure class="widget" data-widget="friction">
  <figcaption>
    <span class="widget-title">Rubbing</span>
    Drag the pad back and forth across the surface. It heats up where you rub, even if the pad ends up exactly where it started. Nothing got carried anywhere, the work is in the rubbing.
  </figcaption>
</figure>

This is also why a battery doesn't throw off radio waves. Charges flowing steadily down a wire just flow, nothing leaves. But make them accelerate back and forth and they launch a wave that gets away from the wire entirely. The faster you shake them, the further it goes.

But then we come to an interesting question, I have finally "wiggled" current fast enough that it jumps out of a wire into the air, what can I do with it? Well, you can charge a phone wirelessly, you can heat a pan and cook something, but what if I want to communicate something? what if I want to send a message using that weird and awesome phenomena? Well, we already know how to send messages with plain voltage, we can turn the thing off and on! And we can reach some agreement as to what turing stuff on and off means! An example of that from back in the way was telegrams and morse code. We agreed and something on for certain time was a dash and for a shorter time was a dot and a combination of those means some character.

Moving forward in time we come to the digical era in which intead of dots and dashes we have on (i.e. 1) and off (i.e 0) and to the combination of those we assign all types of meaning  that go beyond what we are talking today... anyways, back to our wiggly current (signal) we can turn it on and off and the other side can then detect those changes and receive the message we are sending!

And this in fact in one way to send digital messages wirelessly, turn the signal on and off. The action of changing our signal is called modulation and turning it on and off is called amplitude modulation.

<figure class="widget" data-widget="modulation">
  <figcaption>
    <span class="widget-title">On or off</span>
    Each bit says whether the wave is on or off for that moment. Type a number, or click the bits.
  </figcaption>
</figure>



Today I'm gonna pull from a few of my areas of interest to add my two cents into trying to understand IQ momodulation and demodulation. When dealing with SDRs one comes across this idea of IQ signals, ("I" for "In Phase" and "Q" for "Quadrature") and the thing is that it seems pretty important! When you add a new block in GNU Radio the default output is complex samples, which is another way in which IQ samples are represented... I've read a few times now how  [https://www.ieee.li/pdf/essay/quadrature_signals.pdf](https://www.ieee.li/pdf/essay/quadrature_signals.pdf) [https://en.wikipedia.org/wiki/In-phase_and_quadrature_components](https://en.wikipedia.org/wiki/In-phase_and_quadrature_components) [https://pysdr.org/content/sampling](https://pysdr.org/content/sampling) [https://web.archive.org/web/20260217170355/http://whiteboard.ping.se/SDR/IQ](https://web.archive.org/web/20260217170355/http://whiteboard.ping.se/SDR/IQ)


I've read about this a few time now but for some reason the idea didn't click, it didn't make sense! We are dealing with a wave, why are we complicating ourselves with making two waves out of one!? 

It was not until a few week ago that everything clicked!

In this post I want to make my attempt at sharing the why behind IQ data and why it is so great!!
