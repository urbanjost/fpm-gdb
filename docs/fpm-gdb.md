NAME
====

**fpm-gdb**(1f) - \[FUNIX:FILESYSTEM\] launch **gdb**(1) in **vim**(1)
from **fpm**(1) (LICENSE:MIT)

SYNOPSIS
========

**fpm-gdb** \[PROGRAM\]\[OPTIONS\]\[ **--help**\|**--version**\]

DESCRIPTION
===========

**fpm-gdb**(1f) is an **fpm**(1) plugin that starts up **gdb**(1) in the
**vim**(1) editor.

It uses the **vim**(1) terminal feature. The terminal feature is
optional. Enter this in **vim**(1) to check if your version has it:

           :echo has('terminal')

If the result is "1" you have it.

OPTIONS
=======

**PROGRAM**

:   if more than one application is built by the package the name must
    be specified. Unlike with the "fpm run" command wildcards are not
    permitted.

****--gdb** CMDS**

:   pass initial commands to **gdb**(1)

****-wide**,**-w****

:   assume a wide screen width. Wide mode places the code in a window on
    the left of the screen. \<C-W\> followed by one of {RHKLJ} can
    change the window layout.

****--test****

:   use subcommand "test" instead of the default "run" in order to
    select test programs. If **--test** is specified **--example** is
    ignored.

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

Lets start in a terminal at least 132 characters wide and enter

         fpm gdb --wide

and then in the **gdb**(1) command window enter

        b main
        list
        b 40
        run

This will set a breakpoint at the beginning of the program, start
listing the program, set some other breakpoint and then start running
the program

**(with optional arguments).**

:   Clicking on "next" would take you to the next breakpoint.

For some compilers "b **1"**(e.g. Intel) might be required instead of "b
**main"**(e.g gfortran).

**Many other commands exist.**

:   Assuming you are at your next breakpoint, you can ask where you are,
    list local variables and print the value of some variable, like "i"

<!-- -->

        where
        info locals
        print i

USING THE MOUSE
===============

Assuming your terminal window supports **vim**(1) mouse mode, you can
use the mouse in various ways. For example

TO SET BREAK POINTS
-------------------

If you click the right mouse in the code file you should get an option
menu for setting and clearing breakpoints.

TO EVALATE VARIABLES
--------------------

click on variables to highlight them and click the \[eval\] icon.

SCROLLING
=========

The gdb and output windows will not be in Normal mode and so will not
scroll by default. When focus is on the window that will not scroll
enter "ctrl-W N" to go to scrollable, and enter "i" to return to the
original mode.

On some platforms instead of "ctrl-W" followed by capital "N" you can
define which key goes to Normal mode. For example, to define F1 to
switch to Terminal-Normal mode:

         :tnoremap <F1> <C-W>N

In the gdb window in particular, you probably want to toggle between the
modes, because when scrolling is on command recall is not.

When in Normal mode your interaction with the program is suspended, so
you want to return to the original mode or you cannot enter commands in
the gdb pane and cannot see new output or enter input in Normal mode. To
leave scrollable mode (enter "i") in the pane.

Check out :help window-moving for more information on changing the
window layout.

MORE INFO
=========

General gdb instructions are beyond the scope of this discussion, but
"help" in the gdb pane can get you started.

For the **vim**(1) terminal help go to the rightmost **vim**(1) window
and enter ":help terminal-debug".

EXAMPLES
========

fpm gdb

fpm gdb **--compiler** gfortran

\# run with initial **gdb**(1) commands in a file fpm gdb **-wide**
**-gdb** 'source mycmds.gdb'

fpm gdb **--example** demo1

SEE ALSO
========

**gdb**(1), **fpm**(1), **vim**(1)
