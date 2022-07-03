### [fpm-tools](https://github.com/search?q="fpm-tools"%20in:topic%20language:fortran):[fpm-gdb](https://urbanjost.github.io/fpm-gdb/fpm-gdb.1.html)

plugin on POSIX systems to launch gdb(1) on a simple fpm(1) project.

A WIP (Work In Progress). With simple fpm(1) projects if you build 
and install this as "fpm-gdb" in your path, then in other fpm(1)
projects you can enter:

```bash
fpm gdb
```
and launch gdb(1) on your program. 

```bash
fpm gdb --help
```
provides more information. *Assumes you are familiar with gdb(1)*.

Basically, it figures out where the binary is and runs the vim(1)
editor, launching the screen mode. For example:
```bash
fpm run --runner "vim -c 'set mouse=a'  -c 'packadd termdebug'  -c 'resize +10'  -c 'Termdebug build/gfortran_2A42023B310FA28D/app/fpm-gdb' app*.f90"
```
![gdb](docs/images/fpm-gdb.gif)

You could set a breakpoint at the beginning of the program, list the
program, set some other breakpoint and then start running the program
(with optional arguments).  Clicking on "next" would take you to the
next breakpoint.

```text
b main
list
b 40
run  
```
Assuming you are at your next breakpoint, you can ask where you are,
list local variables and print the value of some variable, like "i"
```text
where
info locals
print i
```
General gdb instructions are beyond the scope of this discussion, but
"help" can get you started.
