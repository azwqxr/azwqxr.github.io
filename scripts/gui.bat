@echo off
title GUI Creator dashboard
:menu
color 07
echo Welcome
echo.
echo 1) Notification
echo.
echo 2) Message popup
echo.
echo 3) Sticky note
echo.
set /p input=">> "
if %input% EQU 1 goto noti
if %input% EQU 2 goto msg
if %input% EQU 3 goto note
if %input% NOT 1,2,3 goto error



:error
echo.
echo bruhv please select a valid option!!!!
echo.
pause
goto menu




:noti
cls
color 02
echo Please state the scopes you would like to see:
echo.
set /p titlenoti="Title>> "
echo.
set /p captionnoti="Caption>> "
powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $notify = New-Object System.Windows.Forms.NotifyIcon; $notify.Icon = [System.Drawing.SystemIcons]::Information; $notify.Visible = $true; $notify.ShowBalloonTip(0, '%titlenoti%', '%captionnoti%', [System.Windows.Forms.ToolTipIcon]::Error)}"
cls
goto menu




:msg
cls
color 02
echo Please state the scopes you would like to see:
echo.
set /p titlemsg="Title>> "
echo.
set /p bodymsg="Message>> "
echo.
set /p iconmsg="Icon>> "
powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('%bodymsg%', '%titlemsg%', 'OK', [System.Windows.Forms.MessageBoxIcon]::%iconmsg%);}"
cls
goto menu


:note
cls
color 02
echo Please state the scopes you would like to see:
echo.
set /p titlenote="Title>> "
echo.
set /p bodynote="Message>> "
powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; $mainForm = New-Object System.Windows.Forms.Form; $mainForm.Text = '%titlenote%'; $lbl = New-Object System.Windows.Forms.Label; $lbl.Text = '%bodynote%'; $mainForm.Controls.Add($lbl); $mainForm.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen; $mainForm.ShowDialog()}"
cls
goto menu
