@echo off
echo 🚀 ETF 대시보드 배포 스크립트
echo.

echo 1. Vercel 배포
echo 2. Netlify 배포
echo 3. 로컬 서버 실행
echo 4. GitHub Pages 배포 가이드
echo.

set /p choice="배포 방법을 선택하세요 (1-4): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto local
if "%choice%"=="4" goto github
goto invalid

:vercel
echo.
echo 🔵 Vercel 배포 시작...
echo.
echo Vercel CLI가 설치되어 있는지 확인 중...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI가 설치되지 않았습니다.
    echo 다음 명령어로 설치하세요: npm install -g vercel
    pause
    exit /b 1
)

echo ✅ Vercel CLI 확인 완료
echo.
vercel
echo.
echo 🎉 Vercel 배포 완료!
pause
goto end

:netlify
echo.
echo 🟢 Netlify 배포 시작...
echo.
echo Netlify CLI가 설치되어 있는지 확인 중...
netlify --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Netlify CLI가 설치되지 않았습니다.
    echo 다음 명령어로 설치하세요: npm install -g netlify-cli
    pause
    exit /b 1
)

echo ✅ Netlify CLI 확인 완료
echo.
netlify deploy
echo.
echo 🎉 Netlify 배포 완료!
pause
goto end

:local
echo.
echo 🏠 로컬 서버 실행...
echo.
echo Python이 설치되어 있는지 확인 중...
python --version >nul 2>&1
if not errorlevel 1 (
    echo ✅ Python 서버로 실행합니다.
    echo 브라우저에서 http://localhost:8000 을 열어주세요.
    echo 서버를 중지하려면 Ctrl+C를 누르세요.
    echo.
    python -m http.server 8000
    goto end
)

echo Python이 없습니다. Node.js를 확인합니다...
node --version >nul 2>&1
if not errorlevel 1 (
    echo ✅ Node.js 서버로 실행합니다.
    echo 브라우저에서 http://localhost:8000 을 열어주세요.
    echo 서버를 중지하려면 Ctrl+C를 누르세요.
    echo.
    npx http-server . -p 8000 -c-1
    goto end
)

echo ❌ Python과 Node.js가 모두 설치되지 않았습니다.
echo 다음 중 하나를 설치하세요:
echo - Python: https://python.org
echo - Node.js: https://nodejs.org
pause
goto end

:github
echo.
echo 📚 GitHub Pages 배포 가이드
echo.
echo 1. GitHub에 새 저장소를 생성하세요
echo 2. 모든 파일을 업로드하세요
echo 3. Settings ^> Pages로 이동하세요
echo 4. Source를 "Deploy from a branch"로 설정하세요
echo 5. Branch를 "main"으로 선택하세요
echo 6. Folder를 "/ (root)"로 선택하세요
echo.
echo 배포 완료 후 다음 URL에서 확인할 수 있습니다:
echo https://[사용자명].github.io/[저장소명]
echo.
pause
goto end

:invalid
echo ❌ 잘못된 선택입니다. 1-4 중에서 선택해주세요.
pause
goto end

:end
echo.
echo 스크립트를 종료합니다.

