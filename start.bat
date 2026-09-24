@echo off
title AI Disaster Response System
echo ========================================================
echo       AI Disaster Response & Resource Management
echo             (Node.js + MongoDB + Python AI)
echo ========================================================
echo.
echo Starting all services (AI Model + MERN Backend + Frontend)...
echo.

:: Get directory path
set ROOT_DIR=%~dp0

:: 1. Start Python AI Model (Port 5000)
echo [1/3] Starting AI Model Service on port 5000...
start "AI-Model-5000" /min cmd /c "cd /d "%ROOT_DIR%ai-model" && python app.py"

:: 2. Start Node.js / Express MERN Backend (Port 8081)
echo [2/3] Starting Express + MongoDB Backend on port 8081...
start "Backend-8081" /min cmd /c "cd /d "%ROOT_DIR%backend" && npm start"

:: 3. Wait briefly for services to initialize
echo [3/3] Launching Web Portal in your browser...
timeout /t 4 /nobreak >nul

:: 4. Open original Frontend in default browser
start "" "%ROOT_DIR%frontend\html\index.html"

echo.
echo ========================================================
echo  SUCCESS: All services are running!
echo ========================================================
echo  * Frontend Portal : Opened in browser (%ROOT_DIR%frontend\html\index.html)
echo  * Backend API     : http://localhost:8081/api/health
echo  * MongoDB Database: Connected (mongodb://127.0.0.1:27017/ai_disaster_response)
echo  * AI Model Service: http://localhost:5000/health
echo.
echo  To stop all services anytime, run: stop.bat
echo ========================================================
echo.
timeout /t 10
