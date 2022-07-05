NAME
====

**fpm-gdb**(1f) - \[FUNIX:FILESYSTEM\] simple launch of **gdb**(1) from
**fpm**(1) (LICENSE:MIT)

SYNOPSIS
========

**fpm-gdb** \[PROGRAM\]\[ **--help**\|**--version**\]

DESCRIPTION
===========

**gdb**(1f) is an **fpm**(1) plugin that starts up **gdb**(1).

It uses the **vim**(1) terminal feature. The terminal feature is
optional. Enter this in **vim**(1) to check if your version has it:

           :echo has('terminal')

If the result is "1" you have it.

OPTIONS
=======

***PROGRAM***

:   if more than one application is build in the package the name can be
    specified. Unlike with the "fpm run" command wildcards are not
    permitted.

****-w** {80,132}**

:   assumed screen width. Anything from 132 up places the code in a
    window on the left of the screen.

****--verbose**,**-V****

:   verbose mode

****--version**,**-v****

:   Print version information on standard output then exit successfully.

****--help**,**-h****

:   Print usage information on standard output then exit successfully.

In addition, the following options from the **fpm**(1) "run" subcommand
are supported, noting that "**--profile** debug" is always specified as
well \`\`\`

           --example    --no-prune  --link-flag  --flag
           --directory  --compiler  --c-flag     --c-compiler
           --archiver

GETTING STARTED
===============

You could set a breakpoint at the beginning of the program, list the
program, set some other breakpoint and then start running the program

**(with optional arguments).**

:   Clicking on "next" would take you to the next breakpoint.

Lets start in a terminal 132 characters wide and enter

        fpm gdb -w 132

and then in the **gdb**(1) command window enter

        b main
        list
        b 40
        run

For some compilers "b **1"**(e.g. Intel) might be required instead of "b
**main"**(e.g gfortran).

**Many other commands exist.**

:   Assuming you are at your next breakpoint, you can ask where you are,
    list local variables and print the value of some variable, like "i"

<!-- -->

        where
        info locals
        print i

USING THE MOUSE TO SET BREAK POINTS
===================================

If you click mouse 3 in the code file you should get an option menu for
setting and clearing breakpoints.

Assuming your terminal window supports **vim**(1) mouse mode, you can
use the mouse in various ways. For example, You can click on variables
and the \[eval\] button.

SCROLLING
=========

The gdb and output windows will not be in Normal mode and so will not
scroll by default. When focus is on the window that will not scroll
enter "ctrl-W N" to go to scrollable, and enter "i" to return to the
original mode.

On some platforms instead of "ctrl-W" followed by capital "N" you can
define which key goes to Normal mode.

> In the gdb window in particular, you probably want to toggle between
> the modes, because when scrolling is on command recall is not.
>
> When in Normal mode your interaction with the program is suspended, so
> you want to return to the original mode or you cannot enter commands
> in the gdb pane and cannot see new output or enter input in Normal
> mode. To leave scrollable mode (enter "i") in the pane.
>
> You can define a key to enter the scrollable Terminal-Normal mode. For
> example, to make F1 switch to Terminal-Normal mode:
>
>          :tnoremap <F1> <C-W>N
>
> \# MORE INFO General gdb instructions are beyond the scope of this
> discussion, but "help" in the gdb pane can get you started.
>
> For the **vim**(1) terminal help go to the rightmost **vim**(1) window
> and enter ":help terminal-debug".

SEE ALSO
========

**gdb**(1), **fpm**(1), **vim**(1)
