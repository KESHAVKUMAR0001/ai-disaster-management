@echo off
title Stop AI Disaster Response Services
echo ========================================================
echo       Stopping AI Disaster Response Services
echo ========================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(5000, 8081); foreach ($p in $ports) { $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue; if ($conns) { foreach ($c in $conns) { try { Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host ('[STOPPED] Service on port ' + $p) } catch {} } } }"

echo.
echo All background services on ports 5000 and 8081 stopped.
echo ========================================================
timeout /t 5
