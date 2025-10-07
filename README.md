# 💕 Virtual Pet Love Letters Game 💕

A Tamagotchi-style virtual pet game created with React, Vite, TailwindCSS, and Framer Motion. Take care of your virtual pet to unlock 100 love letters! Perfect for birthdays, anniversaries, or just showing someone you care.

## 🎮 Game Features

- **Virtual Pet**: Take care of your pet's Hunger, Happiness, and Energy needs
- **Interactive Controls**: Feed, Play, Sleep, and Pet your virtual companion
- **Love Letters**: Collect 100 unique love letters that appear based on pet care
- **Scrapbook**: View all collected letters with timestamps
- **Birthday Surprise**: Special celebration when all 100 letters are collected
- **Beautiful Animations**: Smooth Framer Motion animations throughout
- **Responsive Design**: Works perfectly on desktop and mobile
- **Local Storage**: Progress is saved automatically

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd virtual-pet-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## 📱 How to Play

1. **Take Care of Your Pet**: Use the buttons at the bottom to:
   - 🍎 **Feed** - Increases hunger and happiness
   - 🎾 **Play** - Increases happiness (uses energy)
   - 🛏️ **Sleep** - Restores energy over time
   - 🤗 **Pet** - Increases happiness and energy

2. **Collect Love Letters**: When your pet's needs are well-balanced, love letters will appear! Click on them to open and collect.

3. **View Your Scrapbook**: Click the "Scrapbook" button to see all collected letters.

4. **Birthday Surprise**: Collect all 100 letters to unlock a special birthday celebration!

## 🎨 Customization

### Personalizing Love Letters

Edit the file `src/utils/loveLetters.js` to replace the placeholder messages with your own personal love letters. The file contains 100 example messages that you can customize.

### Customizing the Pet

You can modify the pet's appearance, animations, and behavior by editing:
- `src/components/Pet.jsx` - Pet appearance and animations
- `src/components/Room.jsx` - Background decorations
- `src/index.css` - Overall styling and colors

## 🚀 Deployment to GitHub Pages

Follow these steps to deploy your game to GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `virtual-pet-game` (or any name you prefer)
3. Make it public
4. Don't initialize with README (we already have one)

### Step 2: Initialize Git and Push Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Virtual Pet Love Letters Game"

# Add your GitHub repository as remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/virtual-pet-game.git

# Push to GitHub
git push -u origin main
```

### Step 3: Update Package.json

Edit the `package.json` file and update the homepage URL:

```json
{
  "homepage": "https://yourusername.github.io/virtual-pet-game"
}
```

Also update the `vite.config.js` base path:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/virtual-pet-game/', // Make sure this matches your repository name
})
```

### Step 4: Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch and **/ (root)** folder
6. Click **Save**

Your game will be live at: `https://yourusername.github.io/virtual-pet-game`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
virtual-pet-game/
├── src/
│   ├── components/
│   │   ├── Pet.jsx          # Virtual pet component
│   │   ├── Controls.jsx     # Interaction buttons
│   │   ├── Letter.jsx       # Love letter component
│   │   ├── Scrapbook.jsx    # Letter collection viewer
│   │   ├── Room.jsx         # Background decorations
│   │   └── Confetti.jsx     # Celebration animations
│   ├── utils/
│   │   └── loveLetters.js   # 100 love letter messages
│   ├── App.jsx              # Main game logic
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # TailwindCSS configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎯 Game Mechanics

### Pet Needs System
- **Hunger**: Decreases over time, increases when fed
- **Happiness**: Decreases slowly, increases with play and petting
- **Energy**: Decreases with play, increases while sleeping

### Love Letter Spawning
- Letters appear every 25-45 seconds based on pet care quality
- Better care = faster letter spawning
- Letters fall from the top of the screen
- Must be clicked before they fall off screen

### Progress Tracking
- All collected letters are saved in localStorage
- Scrapbook shows collection progress (X/100)
- Special birthday surprise when all 100 letters are collected

## 💝 Perfect For

- **Birthdays** - Personalize the love letters for a special birthday gift
- **Anniversaries** - Celebrate your relationship milestones
- **Valentine's Day** - A unique and interactive way to show love
- **Just Because** - Surprise someone special any day of the year

## 🔧 Troubleshooting

### Common Issues

1. **Game not loading**: Make sure all dependencies are installed with `npm install`
2. **Letters not appearing**: Ensure your pet's needs are well-balanced (above 50%)
3. **Progress not saving**: Check that localStorage is enabled in your browser
4. **Deployment issues**: Verify the repository name matches the base path in vite.config.js

### Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Made with Love

This game was created as a special birthday gift. Feel free to customize it and make it your own!

---

**Happy Birthday! 🎂💕**

*May this virtual pet bring as much joy as you bring to my life every day.*