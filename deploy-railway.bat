@echo off
echo ========================================
echo   Deploy Treen.nation to Railway
echo ========================================
echo.

echo Step 1: Checking Railway CLI...
where railway >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Railway CLI not found!
    echo Please install: npm install -g @railway/cli
    pause
    exit /b 1
)

echo Step 2: Login to Railway...
railway login

echo Step 3: Initialize project (if needed)...
cd backend
railway init

echo Step 4: Setting environment variables...
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=%RANDOM%%RANDOM%%RANDOM%

echo Step 5: Deploying...
railway up

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Get your Railway URL: railway domain
echo 2. Update js/api.js with your Railway URL
echo 3. Deploy frontend to Netlify/Vercel
echo.
pause
