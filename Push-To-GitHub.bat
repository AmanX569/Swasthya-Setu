@echo off
echo ===================================================
echo   Syncing Swasthya Setu Changes to GitHub...
echo ===================================================
cd /d "%~dp0"
git add .
git commit -m "Update Swasthya Setu Platform"
git push origin main
echo ===================================================
echo   Done! Your changes are now live on GitHub.
echo ===================================================
pause
