@echo off
echo ========================================
echo  Virtual Pet Game - GitHub Deployment
echo ========================================
echo.
echo This script will deploy your game to GitHub Pages!
echo.
echo BEFORE RUNNING THIS SCRIPT:
echo 1. Create a repository on GitHub.com named "virtual-pet-game"
echo 2. Make it PUBLIC
echo 3. Don't initialize with README/gitignore
echo.
set /p GITHUB_USERNAME="Enter your GitHub username: "
echo.
echo Connecting to GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/virtual-pet-game.git
echo.
echo Pushing code to GitHub...
git push -u origin main
echo.
echo Building and deploying to GitHub Pages...
npm run deploy
echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your game is now live at:
echo https://%GITHUB_USERNAME%.github.io/virtual-pet-game
echo.
echo Don't forget to enable GitHub Pages:
echo 1. Go to your repository on GitHub
echo 2. Settings ^> Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: gh-pages, Folder: / (root)
echo 5. Click Save
echo.
pause
