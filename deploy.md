# 🚀 Quick Deployment Guide

## One-Time Setup

1. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository named `virtual-pet-game`
   - Make it public
   - Don't initialize with README

2. **Update Configuration**
   - Edit `package.json` line 14: Replace `yourusername` with your GitHub username
   - Edit `vite.config.js` line 7: Replace `virtual-pet-game` if you used a different repository name

## Deploy Commands

Run these commands in your project directory:

```bash
# Initialize git (first time only)
git init
git add .
git commit -m "Initial commit: Virtual Pet Love Letters Game"

# Connect to GitHub (replace with your username)
git remote add origin https://github.com/YOURUSERNAME/virtual-pet-game.git

# Push to GitHub
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

## Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Source: **Deploy from a branch**
5. Branch: **gh-pages** / **/ (root)**
6. Click **Save**

## Your Game Will Be Live At:
`https://YOURUSERNAME.github.io/virtual-pet-game`

## Future Updates

To update your deployed game:
```bash
git add .
git commit -m "Update love letters"
git push
npm run deploy
```
