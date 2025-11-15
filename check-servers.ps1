Write-Host "Checking server status..." -ForegroundColor Cyan
Write-Host ""

# Check Backend (Port 5000)
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Backend is running on http://localhost:5000" -ForegroundColor Green
    Write-Host "   Response: $($backendResponse.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend is NOT running on port 5000" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Check Frontend (Port 5173)
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Frontend is running on http://localhost:5173" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend is NOT running on port 5173" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "If servers are not running:" -ForegroundColor Yellow
Write-Host "1. Make sure you ran: npm run dev" -ForegroundColor White
Write-Host "2. Check backend/.env file exists" -ForegroundColor White
Write-Host "3. Check MongoDB is running" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan

