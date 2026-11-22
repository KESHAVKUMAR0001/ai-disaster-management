@echo off
title AI Disaster Response System
echo ========================================================
echo       AI Disaster Response ^& Resource Management
echo             (Node.js + MongoDB + Python AI)
echo ========================================================
echo.
echo Starting all services (AI Model + MERN Backend + Frontend)...
echo.

:: Get directory path
set "ROOT_DIR=%~dp0"

:: 1. Start Python AI Model (Port 5000)
echo [1/3] Starting AI Model Service on port 5000...
start "AI-Model-5000" /min cmd /k "cd /d %ROOT_DIR%ai-model && python app.py"

:: 2. Start Node.js / Express MERN Backend (Port 8081)
echo [2/3] Starting Express + MongoDB Backend on port 8081...
start "Backend-8081" /min cmd /k "cd /d %ROOT_DIR%backend && npm start"

:: 3. Wait briefly for services to initialize
echo [3/3] Launching Web Portal in your browser...
powershell -NoProfile -Command "Start-Sleep -Seconds 4"

:: 4. Open Frontend in default browser
start "" "http://localhost:8081"

echo.
echo ========================================================
echo  SUCCESS: All services are running!
echo ========================================================
echo  * Frontend Portal : http://localhost:8081
echo  * Backend API     : http://localhost:8081/api/health
echo  * AI Model Service: http://localhost:5000/health
echo.
echo  To stop all services anytime, run: stop.bat
echo ========================================================
echo.
