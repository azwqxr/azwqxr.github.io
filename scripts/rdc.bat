@echo off
title Remote Desktop Connection
set /p host="Computer hostname>> "
set /p user="Username>> "
set /p pass="Password>> "
cls
echo.
echo.
echo.
echo Connecting to %host%...
cmdkey /add:%host% /user:%user% /pass:%pass% >nul
mstsc /v:%host%
cmdkey /delete:%host% >nul