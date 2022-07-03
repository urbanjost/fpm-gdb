var tipuesearch = {"pages":[{"title":" fpm-gdb ","text":"fpm-gdb fpm-tools : fpm-gdb plugin on POSIX systems to launch gdb(1) on a simple fpm(1) project. A WIP (Work In Progress).\nif you build \nand install this as “fpm-gdb” in your path, then in other simple fpm(1)\nprojects that build an application you can enter: fpm gdb and launch gdb(1) on your program. fpm gdb --help provides more information. Assumes you are familiar with gdb(1) . Basically, it figures out where the binary is and runs the vim(1)\neditor, launching the screen mode with the mouse activated. For example: fpm run --runner \"vim -c 'set mouse=a'  -c 'packadd termdebug'  -c 'resize +10'  -c 'Termdebug build/gfortran_2A42023B310FA28D/app/fpm-gdb' app*.f90\" You could set a breakpoint at the beginning of the program, list the\nprogram, set some other breakpoint and then start running the program\n(with optional arguments).  Clicking on “next” would take you to the\nnext breakpoint. Lets start in a terminal 132 characters wide and enter fpm gdb -w 132 and then in the gdb(1) command window enter b main\nlist\nb 40\nrun Assuming you are at your next breakpoint, you can ask where you are,\nlist local variables and print the value of some variable, like “i” where\ninfo locals\nprint i If you click mouse 3 in the code file you should get an option menu for\nsetting and clearing breakpoints. Assuming your terminal window supports vim(1) mouse mode, you can use the\nmouse in various ways. For example, You can click on variables and the\n[eval] button. General gdb instructions are beyond the scope of this discussion, but\n“help” can get you started. For the vim(1) terminal help go to the\nrightmost vim(1) window and enter “:help terminal-debug”. Developer Info John S. Urban","tags":"home","loc":"index.html"},{"title":"fpm-gdb.f90 – fpm-gdb","text":"Contents Programs gdb Source Code fpm-gdb.f90 Source Code program gdb use M_CLI2 , only : set_args , sgets , sget , iget , rget , dget , lget , leafs => unnamed , specified use M_process , ONLY : process_open_read , process_readline , streampointer , process_close implicit none logical :: verbose character ( len = :), allocatable :: help (:), version (:) character ( len = :), allocatable :: cmd integer :: width type ( streampointer ) :: fp ! C file pointer returned by process_open() character ( len = 4096 ) :: line integer ierr ! process command-line options call setup () call set_args ( 'gdb --width:w 80' , help , version ) verbose = lget ( 'verbose' ) call execute_command_line ( 'fpm build' ) call process_open_read ( 'fpm run --runner|grep build' , fp , ierr ) ! open process to read from if ( ierr . eq . 0 ) then call process_readline ( line , fp , ierr ) ! read a line from the process if ( ierr . ne . 0 ) stop 'error processing command' // trim ( cmd ) call process_close ( fp , ierr ) endif cmd = 'fpm run --runner \"' cmd = cmd // \"vim -c 'set mouse=a' \" if ( iget ( 'width' ). ge . 132 ) then cmd = cmd // \" -c 'let g:termdebug_wide=1'\" endif cmd = cmd // \" -c 'packadd termdebug' \" cmd = cmd // \" -c 'resize +10' \" cmd = cmd // \" -c 'Termdebug \" // trim ( line ) // \"'\" cmd = cmd // ' app*.f90\"' if ( lget ( 'verbose' )) then write ( * , * ) trim ( cmd ) endif call execute_command_line ( cmd ) contains subroutine setup () help = [ CHARACTER ( LEN = 128 ) :: & 'NAME' ,& '   fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)' ,& '   (LICENSE:MIT)' ,& '' ,& 'SYNOPSIS' ,& '    fpm-gdb [ --help|--version]' ,& '' ,& 'DESCRIPTION' ,& '   gdb(1f) is an fpm(1) plugin that starts up gdb(1).' ,& '' ,& 'OPTIONS' ,& '    -w {80,132}   assumed screen width' ,& '    --verbose,-V  verbose mode' ,& '    --version,-v  Print version information on standard output then' ,& '                  exit successfully.' ,& '    --help,-h     Print usage information on standard output then' ,& '                  exit successfully.' ,& 'EXAMPLE' ,& '   Sample commands' ,& '' ,& '    fpm gdb' ,& 'SEE ALSO' ,& '    which(1)' ,& '' ] !> !!##NAME !!    fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1) !!    (LICENSE:MIT) !! !!##SYNOPSIS !! !!     fpm-gdb [ --help|--version] !! !!##DESCRIPTION !!    gdb(1f) is an fpm(1) plugin that starts up gdb(1). !! !!##OPTIONS !!     -w {80,132}   assumed screen width !!     --verbose,-V  verbose mode !!     --version,-v  Print version information on standard output then !!                   exit successfully. !!     --help,-h     Print usage information on standard output then !!                   exit successfully. !!##EXAMPLE !! !!    Sample commands !! !!     fpm gdb !!##SEE ALSO !!     which(1) version = [ CHARACTER ( LEN = 128 ) :: & 'PRODUCT:        GPF (General Purpose Fortran) utilities and examples' ,& 'PROGRAM:        fpm-gdb(1f)' ,& 'DESCRIPTION:    fpm(1) plugin that launches gdb(1)' ,& 'VERSION:        2.0, 2022-04-29' ,& 'AUTHOR:         John S. Urban' ,& 'LICENSE:        MIT' ,& '' ] end subroutine setup end program gdb","tags":"","loc":"sourcefile/fpm-gdb.f90.html"},{"title":"setup – fpm-gdb","text":"subroutine setup() NAME fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)\n(LICENSE:MIT) SYNOPSIS fpm-gdb [ --help|--version] DESCRIPTION gdb(1f) is an fpm(1) plugin that starts up gdb(1). OPTIONS - w { 80 , 132 } assumed screen width -- verbose , - V verbose mode -- version , - v Print version information on standard output then exit successfully . -- help , - h Print usage information on standard output then exit successfully . EXAMPLE Sample commands\n\n fpm gdb SEE ALSO which(1) Arguments None Contents Source Code setup Source Code subroutine setup () help = [ CHARACTER ( LEN = 128 ) :: & 'NAME' ,& '   fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)' ,& '   (LICENSE:MIT)' ,& '' ,& 'SYNOPSIS' ,& '    fpm-gdb [ --help|--version]' ,& '' ,& 'DESCRIPTION' ,& '   gdb(1f) is an fpm(1) plugin that starts up gdb(1).' ,& '' ,& 'OPTIONS' ,& '    -w {80,132}   assumed screen width' ,& '    --verbose,-V  verbose mode' ,& '    --version,-v  Print version information on standard output then' ,& '                  exit successfully.' ,& '    --help,-h     Print usage information on standard output then' ,& '                  exit successfully.' ,& 'EXAMPLE' ,& '   Sample commands' ,& '' ,& '    fpm gdb' ,& 'SEE ALSO' ,& '    which(1)' ,& '' ] !> !!##NAME !!    fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1) !!    (LICENSE:MIT) !! !!##SYNOPSIS !! !!     fpm-gdb [ --help|--version] !! !!##DESCRIPTION !!    gdb(1f) is an fpm(1) plugin that starts up gdb(1). !! !!##OPTIONS !!     -w {80,132}   assumed screen width !!     --verbose,-V  verbose mode !!     --version,-v  Print version information on standard output then !!                   exit successfully. !!     --help,-h     Print usage information on standard output then !!                   exit successfully. !!##EXAMPLE !! !!    Sample commands !! !!     fpm gdb !!##SEE ALSO !!     which(1) version = [ CHARACTER ( LEN = 128 ) :: & 'PRODUCT:        GPF (General Purpose Fortran) utilities and examples' ,& 'PROGRAM:        fpm-gdb(1f)' ,& 'DESCRIPTION:    fpm(1) plugin that launches gdb(1)' ,& 'VERSION:        2.0, 2022-04-29' ,& 'AUTHOR:         John S. Urban' ,& 'LICENSE:        MIT' ,& '' ] end subroutine setup","tags":"","loc":"proc/setup.html"},{"title":"gdb – fpm-gdb","text":"Uses M_CLI2 M_process Contents Variables cmd fp help ierr line verbose version width Subroutines setup Source Code gdb Variables Type Attributes Name Initial character(len=:), allocatable :: cmd type(streampointer) :: fp character(len=:), allocatable :: help (:) integer :: ierr character(len=4096) :: line logical :: verbose character(len=:), allocatable :: version (:) integer :: width Subroutines subroutine setup () Read more… Arguments None Source Code program gdb use M_CLI2 , only : set_args , sgets , sget , iget , rget , dget , lget , leafs => unnamed , specified use M_process , ONLY : process_open_read , process_readline , streampointer , process_close implicit none logical :: verbose character ( len = :), allocatable :: help (:), version (:) character ( len = :), allocatable :: cmd integer :: width type ( streampointer ) :: fp ! C file pointer returned by process_open() character ( len = 4096 ) :: line integer ierr ! process command-line options call setup () call set_args ( 'gdb --width:w 80' , help , version ) verbose = lget ( 'verbose' ) call execute_command_line ( 'fpm build' ) call process_open_read ( 'fpm run --runner|grep build' , fp , ierr ) ! open process to read from if ( ierr . eq . 0 ) then call process_readline ( line , fp , ierr ) ! read a line from the process if ( ierr . ne . 0 ) stop 'error processing command' // trim ( cmd ) call process_close ( fp , ierr ) endif cmd = 'fpm run --runner \"' cmd = cmd // \"vim -c 'set mouse=a' \" if ( iget ( 'width' ). ge . 132 ) then cmd = cmd // \" -c 'let g:termdebug_wide=1'\" endif cmd = cmd // \" -c 'packadd termdebug' \" cmd = cmd // \" -c 'resize +10' \" cmd = cmd // \" -c 'Termdebug \" // trim ( line ) // \"'\" cmd = cmd // ' app*.f90\"' if ( lget ( 'verbose' )) then write ( * , * ) trim ( cmd ) endif call execute_command_line ( cmd ) contains subroutine setup () help = [ CHARACTER ( LEN = 128 ) :: & 'NAME' ,& '   fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)' ,& '   (LICENSE:MIT)' ,& '' ,& 'SYNOPSIS' ,& '    fpm-gdb [ --help|--version]' ,& '' ,& 'DESCRIPTION' ,& '   gdb(1f) is an fpm(1) plugin that starts up gdb(1).' ,& '' ,& 'OPTIONS' ,& '    -w {80,132}   assumed screen width' ,& '    --verbose,-V  verbose mode' ,& '    --version,-v  Print version information on standard output then' ,& '                  exit successfully.' ,& '    --help,-h     Print usage information on standard output then' ,& '                  exit successfully.' ,& 'EXAMPLE' ,& '   Sample commands' ,& '' ,& '    fpm gdb' ,& 'SEE ALSO' ,& '    which(1)' ,& '' ] !> !!##NAME !!    fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1) !!    (LICENSE:MIT) !! !!##SYNOPSIS !! !!     fpm-gdb [ --help|--version] !! !!##DESCRIPTION !!    gdb(1f) is an fpm(1) plugin that starts up gdb(1). !! !!##OPTIONS !!     -w {80,132}   assumed screen width !!     --verbose,-V  verbose mode !!     --version,-v  Print version information on standard output then !!                   exit successfully. !!     --help,-h     Print usage information on standard output then !!                   exit successfully. !!##EXAMPLE !! !!    Sample commands !! !!     fpm gdb !!##SEE ALSO !!     which(1) version = [ CHARACTER ( LEN = 128 ) :: & 'PRODUCT:        GPF (General Purpose Fortran) utilities and examples' ,& 'PROGRAM:        fpm-gdb(1f)' ,& 'DESCRIPTION:    fpm(1) plugin that launches gdb(1)' ,& 'VERSION:        2.0, 2022-04-29' ,& 'AUTHOR:         John S. Urban' ,& 'LICENSE:        MIT' ,& '' ] end subroutine setup end program gdb","tags":"","loc":"program/gdb.html"}]}