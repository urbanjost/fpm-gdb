### [fpm-tools](https://github.com/search?q="fpm-tools"%20in:topic%20language:fortran):[fpm-gdb](https://urbanjost.github.io/fpm-gdb/fpm-gdb.1.html)

This is a fpm(1) plugin for POSIX systems. 

It launchs the GNU debugger gdb(1) on a simple fpm(1) project.

if you build and install this as "fpm-gdb" in your path, then in other
simple fpm(1) projects that build an application you can enter:

```bash
fpm gdb
```
and launch gdb(1) on your program. 

```bash
fpm gdb --help
```
provides more information. *Assumes you are familiar with gdb(1)*.

Basically, it figures out where the binary is and runs the vim(1)
editor, launching the screen mode with the mouse activated. For example:
```bash
fpm run --runner "vim -c 'set mouse=a'  -c 'packadd termdebug'  -c 'resize +10'  -c 'Termdebug build/gfortran_2A42023B310FA28D/app/fpm-gdb' app*.f90"
```
![gdb](docs/images/fpm-gdb.1.gif)

The man-page is available on-line at [fpm-gdb](https://urbanjost.github.io/fpm-gdb/fpm-gdb.1.html)

Please leave usage tips on the [wiki](https://github.com/urbanjost/fpm-gdb/wiki); 
[discuss](https://github.com/urbanjost/fpm-gdb/discussions) general possibilities for the plug-in;
and report [issues](https://github.com/urbanjost/fpm-gdb/issues).


# Getting started
We will set a breakpoint at the beginning of the program, list the
program, set some other breakpoint and then start running the program
(with optional arguments).  Clicking on "next" would take you to the
next breakpoint.

Lets start in a terminal 132 characters wide and enter
```text
fpm gdb --wide 
```
and then in the gdb(1) command window enter
```text
b main
list
b 40
run  
```
For some compilers "b 1"(e.g. Intel) might be required instead of "b
main"(e.g gfortran).

Many other commands exist.  Assuming you are at your next breakpoint,
you can ask where you are, list local variables and print the value of
some variable, like "i"
```text
where
info locals
print i
```
# Using the mouse to set break points
If you click the right mouse in the code file you should get an option
menu for setting and clearing breakpoints.

Assuming your terminal window supports vim(1) mouse mode, you can use the
mouse in various ways. For example, You can click on variables and the
[eval] button.

# Scrolling
The gdb and output windows will not be in Normal mode and so
will not scroll by default. When focus is on the window that will not
scroll enter "ctrl-W N" to go to scrollable, and enter "i" to return
to the original mode.

On some platforms instead of "ctrl-W" followed by capital "N" you can
define which key goes to Normal mode.

As an example function key 1 has been defined to do that using the
vim(1) command 

      :tnoremap <F1> <C-W>N

Note that whether this example key definition works depends on your
keyboard layout and your terminfo file for the terminal emulator you
are using.

In the gdb window in particular, you probably want to toggle between
the modes, because when scrolling is on command recall is not.

When in Normal mode your interaction with the program is suspended, so
you want to return to the original mode or you cannot enter commands in
the gdb pane and cannot see new output or enter input in Normal mode.
To leave scrollable mode (enter "i") in the pane.

# Installation
If you have the fpm-tools(1) plugin enter:
```bash
   fpm tools urbanjost/fpm-gdb
```
or clone the repository and use fpm(1) to build and install the application.
```bash
git clone https://github.com/urbanjost/fpm-gdb.git
cd fpm-gdb
# assuming the default installation directory is OK; otherwise see 
#    "fpm help install ".
fpm install
# and then you may remove the fpm-gdb directory
```

# More info
General gdb(1) instructions are beyond the scope of this discussion, but
"help" in the gdb(1) pane can get you started.

For the vim(1) terminal help go to the rightmost vim(1) window and enter
":help terminal-debug".
