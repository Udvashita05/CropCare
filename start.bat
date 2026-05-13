@echo off
echo Starting CropCare AI...

:: Kill existing node processes to ensure fresh start
taskkill /F /IM node.exe >nul 2>&1

:: Start the Backend in a new window
echo Starting Backend...
start "CropCare Backend" cmd /k "cd backend && node server.js"

:: Wait 4 seconds to let backend initialize
timeout /t 4 /nobreak > nul

:: Start the Frontend in a new window
echo Starting Frontend...
start "CropCare Frontend" cmd /k "cd frontend && npm run dev"

:: Wait 3 seconds for Vite to be ready
timeout /t 3 /nobreak > nul

:: Open the browser
echo Opening CropCare AI in browser...
explorer "http://127.0.0.1:5173"

echo CropCare AI is now running.
echo - Backend: http://127.0.0.1:5000
echo - Frontend: http://127.0.0.1:5173
pause
