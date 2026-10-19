+++
title = "How IQ Modulation/Demodulation finally clicked"
description = ""
date = "2026-10-19"
draft = true
+++

Today I'm gonna pull from a few of my areas of interest to add my two cents into trying to understand IQ momodulation and demodulation. When dealing with SDRs one comes across this idea of IQ signals, ("I" for "In Phase" and "Q" for "Quadrature") and the thing is that it seems pretty important! When you add a new block in GNU Radio the default output is complex samples, which is another way in which IQ samples are represented... I've read a few times now how  [https://www.ieee.li/pdf/essay/quadrature_signals.pdf](https://www.ieee.li/pdf/essay/quadrature_signals.pdf) [https://en.wikipedia.org/wiki/In-phase_and_quadrature_components](https://en.wikipedia.org/wiki/In-phase_and_quadrature_components) [https://pysdr.org/content/sampling](https://pysdr.org/content/sampling) [https://web.archive.org/web/20260217170355/http://whiteboard.ping.se/SDR/IQ](https://web.archive.org/web/20260217170355/http://whiteboard.ping.se/SDR/IQ)


I've read about this a few time now but for some reason the idea didn't click, it didn't make sense! We are dealing with a wave, why are we complicating ourselves with making two waves out of one!? 

It was not until a few week ago that everything clicked!

In this post I want to make my attempt at sharing the why behind IQ data and why it is so great!!
