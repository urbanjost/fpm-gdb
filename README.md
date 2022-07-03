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
