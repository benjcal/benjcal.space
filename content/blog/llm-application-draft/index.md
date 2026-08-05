+++
title = "LLMs and process vs results (draft)"
description = ""
date = "2026-08-05"
draft = true
+++

<!-- TODO: this is the LLM section pulled out of "I Built a Blog and Forgot to Write". It needs a proper intro when it becomes its own post (the "I think an application of this..." opener references the process vs results framing of the original post). -->

I think an application of this can also be made to the much-discussed LLM phenomenon currently happening, specifically as it applies to software engineering.

I've come to realize that there are different levels of _care_ that I have for different kinds of code in a codebase. Some parts of the codebase I couldn't care less and thus I'm happy to give the LLM full discretion on implementation details, as long as I have a broad understanding that nothing is particularly dumb, and that the code produces the results I want (i.e. passes the unit tests, the GUI renders properly). This is akin to using a library as a dependency. I don't know how many people read, say, the React code, before importing it and going on their merry way (now, blindly using dependencies has led to some [spectacularly](https://expertinsights.com/news/active-npm-supply-chain-attack-compromises-323-packages) [bad](https://www.securityweek.com/over-400-npm-packages-infected-in-chaindrop-supply-chain-attack/) [things](https://www.securityweek.com/1800-hit-in-mini-shai-hulud-attack-on-sap-lightning-intercom/)!).

But then there are parts of the codebase where I positively care about implementation details, naming conventions, code formatting, and such pickiness that we devs develop through our careers! There the LLM might be an editor, a brainstorming box, an expert advisor, but there I'm driving. These tend to be areas that might deal with core competencies, areas that I possess domain knowledge/expertise, or just foundational data structures and algorithms whose APIs are used across the whole codebase. In these cases, the process, that is, how exactly we're processing this data, or reaching these decisions, or what have you is something I care about!
