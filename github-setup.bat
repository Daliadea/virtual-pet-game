@echo off
echo ========================================
echo  GitHub Repository Setup Commands
echo ========================================
echo.
echo 1. First, create a repository on GitHub.com named "virtual-pet-game"
echo 2. Then run these commands (replace YOURUSERNAME with your GitHub username):
echo.
echo git remote add origin https://github.com/YOURUSERNAME/virtual-pet-game.git
echo git push -u origin main
echo npm run deploy
echo.
echo 3. Go to your repository Settings ^> Pages
echo 4. Set Source to "Deploy from a branch"
echo 5. Select "gh-pages" branch and "/ (root)" folder
echo 6. Click Save
echo.
echo Your game will be live at: https://YOURUSERNAME.github.io/virtual-pet-game
echo.
pause
