@echo off
title Swasthya Setu - Supabase Backend Engine
cls
echo ==================================================================
echo       SWASTHYA SETU - SUPABASE POSTGRESQL BACKEND LAUNCHER        
echo ==================================================================
echo Starting local Supabase PostgREST server on port 54321...
echo.
node "%~dp0server\server.js"
pause
