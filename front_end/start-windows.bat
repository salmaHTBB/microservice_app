@echo off
echo Starting Angular Development Server...
echo.
echo Please wait while the application compiles...
echo Once you see "Compiled successfully", open http://localhost:4200
echo.
cd /d "%~dp0"
call npm start
