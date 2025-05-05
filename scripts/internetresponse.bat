@echo off
title Internet speedtest:
:main
cls
color 8f
echo.
echo.
echo Internet Speedtest
echo.
echo.
powershell -Command "& {Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::InputBox('Enter website or IP adress:', 'Speedtest Prompt')}" > %TEMP%\out.tmp
set /p OUT=<%TEMP%\out.tmp
set msgBoxArgs="& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Confirm: %OUT%', 'Speedtest Prompt');}"
powershell -Command %msgBoxArgs%
cls
title Internet speedtest: pinging %out%
echo.
echo.
echo Internet Speedtest
echo.
echo.
ping %out%
pause
if /I "%errorlevel%" EQU "1" (
goto main
)
cls
title Internet speedtest:
echo.
echo.
echo Internet Speedtest
echo.
echo.
set /p againd="Try again? (Y or N): "
if /I "%againd%" EQU "y" (
goto main
)
if /I "%againd%" EQU "n" (
exit
)