program gdb
use M_CLI2, only : set_args, sgets, sget, iget, rget, dget, lget, leafs=>unnamed, specified
use M_process ,ONLY: process_open_read, process_readline, streampointer, process_close
implicit none
logical                      :: verbose
character(len=:),allocatable :: help(:),version(:)
character(len=:),allocatable :: cmd
integer :: width
type(streampointer) :: fp ! C file pointer returned by process_open()
character(len=4096) :: line
integer ierr
   ! process command-line options
   call setup()
   call set_args('gdb --width:w 80',help,version)
   verbose=lget('verbose')

   call process_open_read( 'fpm run --runner|grep build' ,fp,ierr) ! open process to read from
   if(ierr.eq.0)then
     call process_readline(line,fp,ierr) ! read a line from the process
     if(ierr.ne.0) stop 'error processing command'//trim(cmd)
     call process_close(fp,ierr)
   endif
   cmd='fpm run --runner "'
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
contains
subroutine setup()
help=[ CHARACTER(LEN=128) :: &
'NAME',&
'   fpm-gdb(1f) - [FUNIX:FILESYSTEM] simple launch of gdb(1) from fpm(1)',&
'   (LICENSE:MIT)',&
'',&
'SYNOPSIS',&
'    fpm-gdb [ --help|--version]',&
'',&
'DESCRIPTION',&
'   gdb(1f) is an fpm(1) plugin that starts up gdb(1).',&
'',&
'OPTIONS',&
'    -w {80,132}   assumed screen width',&
'    --verbose,-V  verbose mode',&
'    --version,-v  Print version information on standard output then',&
'                  exit successfully.',&
'    --help,-h     Print usage information on standard output then',&
'                  exit successfully.',&
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
!!     fpm-gdb [ --help|--version]
!!
!!##DESCRIPTION
!!    gdb(1f) is an fpm(1) plugin that starts up gdb(1).
!!
!!##OPTIONS
!!     -w {80,132}   assumed screen width
!!     --verbose,-V  verbose mode
!!     --version,-v  Print version information on standard output then
!!                   exit successfully.
!!     --help,-h     Print usage information on standard output then
!!                   exit successfully.
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
