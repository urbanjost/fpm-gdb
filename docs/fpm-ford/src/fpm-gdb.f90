program gdb
use M_CLI2, only : set_args, sgets, sget, iget, rget, dget, lget, leafs=>unnamed, specified
use M_process ,ONLY: process_open_read, process_readline, streampointer, process_close
implicit none
logical                      :: verbose
character(len=:),allocatable :: help(:),version(:)
character(len=:),allocatable :: cmd
integer :: width
integer :: i
type(streampointer) :: fp ! C file pointer returned by process_open()
character(len=4096) :: line
integer ierr
character(len=*),parameter :: run_options=' --example F '
character(len=*),parameter :: common_options='&
 --no-prune F --link-flag " " --flag " " --directory:C " " --compiler "gfortran" --c-flag " " --c-compiler " " --archiver " " '
character(len=:),allocatable :: options
   ! process command-line options
   call setup()
   call set_args('gdb --width:w 80 '//common_options//run_options,help,version)
   verbose=lget('verbose')
   options=''
   if(specified('no-prune'))options=options//' --noprune '
   if(specified('directory'))options=options//' --directory '//sget('directory')
   if(specified('compiler'))options=options//' --compiler '//sget('compiler')
   if(specified('link-flag'))options=options//' --link-flag "'//sget('link-flag')//'"'
   if(specified('flag'))options=options//' --flag "'//sget('flag')//'"'
   if(specified('c-flag'))options=options//' --c-flag "'//sget('c-flag')//'"'
   if(specified('archiver'))options=options//' --archiver "'//sget('archiver')//'"'
   write(*,*)'options=',options

   if(size(leafs).eq.0)leafs=['']
   do i=1,size(leafs)

      ! need to make a call to the fpm API to get the program cleanly.
      cmd='fpm run '//trim(leafs(i))//options//" --profile debug --runner|grep '^build'"
      ! note the process_* procedures are currently available only on POSIX platforms
      ! could use system commands based on OS or possibly get M_process to support
      ! more platforms
      call process_open_read(cmd,fp,ierr) ! open process to read from
      if(ierr.eq.0)then
        call process_readline(line,fp,ierr) ! read a line from the process
        if(ierr.ne.0) stop 'error processing command'//trim(cmd)
        call process_close(fp,ierr)
      endif
      cmd='fpm run '//trim(leafs(i))//options//' --profile debug --runner "'
      cmd=cmd//"vim -c 'set mouse=a' "
      if(iget('width').ge.132)then
          cmd=cmd//" -c 'let g:termdebug_wide=1'"
      endif
      cmd=cmd//" -c 'packadd termdebug' "
      cmd=cmd//" -c 'resize +10' "
      cmd=cmd//" -c 'Termdebug "//trim(line)//"'"
      cmd=cmd//' app*.f90"'
      if(lget('verbose'))then
         write(*,*)trim(cmd)
      endif
      call execute_command_line(cmd)
   enddo
contains
subroutine setup()
help=[ CHARACTER(LEN=128) :: &
'NAME',&
'   fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)',&
'   (LICENSE:MIT)',&
'',&
'SYNOPSIS',&
'    fpm-gdb [PROGRAM][ --help|--version]',&
'',&
'DESCRIPTION',&
'   gdb(1f) is an fpm(1) plugin that starts up gdb(1).',&
'',&
'OPTIONS',&
'    PROGRAM       if more than one application is build in the package',&
'                  the name can be specified. Unlike with the "fpm run"',&
'                  command wildcards are not permitted.',&
'    -w {80,132}   assumed screen width. Anything from 132 up places the',&
'                  code in a window on the left of the screen.',&
'    --verbose,-V  verbose mode',&
'    --version,-v  Print version information on standard output then',&
'                  exit successfully.',&
'    --help,-h     Print usage information on standard output then',&
'                  exit successfully.',&
'',&
'   In addition, the following options from the fpm(1) "run" subcommand',&
'   are supported, noting that "--profile debug" is always specified as',&
'   well ...',&
'',&
'       --example    --no-prune  --link-flag  --flag',&
'       --directory  --compiler  --c-flag     --c-compiler',&
'       --archiver',&
'EXAMPLE',&
'   Sample commands',&
'',&
'    fpm gdb',&
'SEE ALSO',&
'    which(1)',&
'']
!>
!!##NAME
!!    fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)
!!    (LICENSE:MIT)
!!
!!##SYNOPSIS
!!
!!     fpm-gdb [PROGRAM][ --help|--version]
!!
!!##DESCRIPTION
!!    gdb(1f) is an fpm(1) plugin that starts up gdb(1).
!!
!!##OPTIONS
!!     PROGRAM       if more than one application is build in the package
!!                   the name can be specified. Unlike with the "fpm run"
!!                   command wildcards are not permitted.
!!     -w {80,132}   assumed screen width. Anything from 132 up places the
!!                   code in a window on the left of the screen.
!!     --verbose,-V  verbose mode
!!     --version,-v  Print version information on standard output then
!!                   exit successfully.
!!     --help,-h     Print usage information on standard output then
!!                   exit successfully.
!!
!!    In addition, the following options from the fpm(1) "run" subcommand
!!    are supported, noting that "--profile debug" is always specified as
!!    well ...
!!
!!        --example    --no-prune  --link-flag  --flag
!!        --directory  --compiler  --c-flag     --c-compiler
!!        --archiver
!!##EXAMPLE
!!
!!    Sample commands
!!
!!     fpm gdb
!!##SEE ALSO
!!     which(1)
version=[ CHARACTER(LEN=128) :: &
'PRODUCT:        GPF (General Purpose Fortran) utilities and examples',&
'PROGRAM:        fpm-gdb(1f)',&
'DESCRIPTION:    fpm(1) plugin that launches gdb(1)',&
'VERSION:        2.0, 2022-04-29',&
'AUTHOR:         John S. Urban',&
'LICENSE:        MIT',&
'']
end subroutine setup
end program gdb
