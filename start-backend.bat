@echo off
echo ========================================
echo   Starting Git History Explorer Backend
echo ========================================
echo.

cd backend

echo Checking for .env file...
if not exist .env (
    echo.
    echo ERROR: .env file not found!
    echo Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/git-explorer
        echo JWT_SECRET=de986251ecda13832080ba4b5020d2da51d8f7cfa6ada5104c16b1c4212499b5
        echo OPENAI_API_KEY=
    ) > .env
    echo .env file created!
    echo.
)

echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting backend server...
echo.
echo ========================================
echo   Backend will run on http://localhost:5000
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev

pause

