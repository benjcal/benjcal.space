+++
title = "Because I can't ever remember SDL"
description = "A post where I introduce a helper to make using SDL simpler"
date = 2023-08-09
+++


From time to time I want to make a quick 'n dirty SDL window to play with some graphic something. The current curiosity is learning 3D rendering ["by hand"](https://machinethink.net/blog/3d-rendering-without-shaders/).

Well, every single time I need to do this I find myself having to research SDL and relearn it all over again 🤦‍♂️. I know I need to init sdl and then... create a window, right? a renderer or a surface? how was it that I handled events? something double loop... I think? Or did I just waited for events?

Another pet peeve that I have with SDL is that it can be a bit verbose. Nothing against that though, the flexibility and control that that verbosity provides makes it worth it for me, something that often makes C libraries superior IMHO. But with that said, I like how tidy [raylib](https://github.com/raysan5/raylib/blob/master/examples/core/core_basic_window.c) is even though it can be limiting is some cases.

And thus, after so much pain and searching for the same things over and over again, I finally decided to write a single header wrapper around SDL called [sdlsimple.h](https://gist.github.com/benjcal/60bbbaf297a4a3be5cb3464832365eea).

Here's how it works:

First, include the header in the project

```c
#define SDLSIMPLE_IMPLEMENTATION // use this only once in the your project
#include "sdlsimple.h"
```

Next initialize it.

```c
sdlsimple_context_t *ctx = malloc(sizeof(sdlsimple_context_t));
sdlsimple_init(ctx, WIDTH, HEIGHT);
```

All the magic then happens between in your main loop between `sdlsimple_start(ctx)` and `sdlsimple_end(ctx)`.

```c
while(!sdlsimple_should_quit(ctx)) {
    sdlsimple_start(ctx);

    sdlsimple_clear(ctx, 0, 0, 0);

    // draw red line at y = 100
    for (int i = 0; i < WIDTH; i++)
			sdlsimple_set_pixel(ctx, i, 100, 255, 0, 0);

    sdlsimple_end(ctx);
}
```

And that is that. On the background sdlsimple uses an `SDL_Renderer`, instead of a surface, to draw and the events are not blocking, that is, we are not waiting for events but drawing as fast as our computer let's us.

I guess I should say that this is not a production ready library. It uses the OS as garbage collector (100% free of `free()`!), there's very little error checking and all the rest of the stuff needed to make software reliable.

But at the end of the day, done is better than perfect and this is enough to move on and actually start drawing pixels to my window.

Until next time!
