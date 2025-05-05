@echo off
set tip=[96m[TIP:][0m
title Information for: %username%
color a
setlocal enabledelayedexpansion
systeminfo>%temp%\info.txt
for /f "tokens=2 delims=:" %%a in ('type %temp%\info.txt ^| find "Registered Owner"') do set owner=%%a
for /f "tokens=2 delims=:" %%a in ('type %temp%\info.txt ^| find "OS Name"') do set osname=%%a
for /f "tokens=2 delims=:" %%a in ('type %temp%\info.txt ^| find "System Manufacturer"') do set manufacture=%%a
for /f "tokens=2 delims=:" %%a in ('type %temp%\info.txt ^| find "Product ID"') do set productkey=%%a
del %temp%\info.txt
set owner=%owner: =%
set osname=%osname:~19%
set manufacture=%manufacture:~7%
set productkey=%productkey: =%
if /I "%processor_architecture%" EQU "x86_64" set arch=x64
if /I "%processor_architecture%" EQU "AMD64" set arch=x64
if /I "%processor_architecture%" EQU "x86" set arch=x32
color 0f
echo.
echo Username: %username%
echo Hostname: %computername%
echo OS: %osname%
echo Owner/Main administrator: %owner%
echo Product Key: %productkey%
echo Processors: %number_of_processors%
echo Mothboard Manufacturer: %manufacture%
echo.
echo.
echo [96m[TIP:][0m [93m The title of this command tab changes depending on the account you use[0m
echo.
echo.
pause