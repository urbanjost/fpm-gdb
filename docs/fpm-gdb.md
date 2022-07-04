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

EXAMPLE
=======

Sample commands

        fpm gdb

SEE ALSO
========

**which**(1)
