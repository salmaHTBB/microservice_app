@echo off
echo ======================================
echo   MicroCommerce Suite - Frontend Setup
echo ======================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm is not installed.
    pause
    exit /b 1
)

echo [OK] npm version:
npm -v
echo.

:: Install dependencies
echo Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo [OK] Dependencies installed successfully!
    echo.
    echo ======================================
    echo   Setup Complete!
    echo ======================================
    echo.
    echo To start the development server, run:
    echo   npm start
    echo.
    echo The application will be available at:
    echo   http://localhost:4200
    echo.
    echo Make sure your backend services are running:
    echo   - Config Service
    echo   - Discovery Service ^(Eureka^)
    echo   - Gateway Service ^(port 8888^)
    echo   - Customer Service
    echo   - Inventory Service
    echo   - Billing Service
    echo.
) else (
    echo.
    echo X Failed to install dependencies
    pause
    exit /b 1
)

pause
