@echo off
:res
cls
title hacking terminal
color a
echo.
echo.
echo ########################################################################################################################
echo                                              HACKING TERMINAL                                                           
echo ########################################################################################################################
echo.
echo.
echo type 'help' or '?' for help
echo.
set /p asdf=">>> "
if %asdf% EQU help goto help
if %asdf% EQU ? goto help
if %asdf% EQU hack-1 goto hack-1
if %asdf% EQU hack-2 goto hack-2
if %asdf% EQU hack-3 goto hack-3

:help
cls
echo.
echo.
echo ########################################################################################################################
echo                                                   HELP MENU                                                           
echo ########################################################################################################################
echo.
echo.
echo.
echo.
echo hack-1 - 01101101010011100001010101001
echo.
echo hack-2 - hello ur computer has virus
echo.
echo hack-3 - hack the terminal maybe possibly???
echo.
pause
goto res

:hack-1
cls
goto hack-1res

:hack-1res
echo %random%%random%%random%%random%%random%%random%
echo %random%%random%%random%%random%%random%%random%
echo %random%%random%%random%%random%%random%%random%
goto hack-1res

:hack-2
powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $notify = New-Object System.Windows.Forms.NotifyIcon; $notify.Icon = [System.Drawing.SystemIcons]::Information; $notify.Visible = $true; $notify.ShowBalloonTip(0, 'System Security', 'Warning your system has a virus', [System.Windows.Forms.ToolTipIcon]::Warning)}"
goto res

:hack-3
cls
title lanimret gnikcah
echo.
echo.
echo ########################################################################################################################
echo                                              LANIMRET GNIKCAH                                                    
echo ########################################################################################################################
echo.
echo.
echo pleh rof '?' ro 'pleh' epyt
echo.
set /p fdsa=">>> "
if %fdsa% EQU pleh goto pleh
if %fdsa% EQU ? goto pleh
if %fdsa% EQU 1-kcah goto 1-kcah
if %fdsa% EQU 2-kcah goto 2-kcah
if %fdsa% EQU revert goto res

:pleh
cls
echo.
echo.
echo ########################################################################################################################
echo                                                   UNEM PLEH                                                           
echo ########################################################################################################################
echo.
echo.
echo.
echo.
echo 1-kcah - 01101101010011100001010101001
echo.
echo 2-kcah - hello ur computer has virus
echo.
echo revert - unhack the terminal maybe possibly???
echo.
pause
goto hack-3