# How to Run the Game

## ✅ MVP is Ready!

The game is now built and ready to play! Here's how to run it:

## Option 1: Local Web Server (Recommended)

### Using Python (easiest)

1. Open Terminal and navigate to the game folder:
   ```bash
   cd /Users/anthonyoshima/Documents/WelcometoTED/Claude_Projects/pixel_pet
   ```

2. Start a simple HTTP server:
   ```bash
   # Python 3
   python3 -m http.server 8000

   # OR Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Using Node.js (if you have it)

1. Install http-server globally (one time):
   ```bash
   npm install -g http-server
   ```

2. Navigate to game folder and run:
   ```bash
   cd /Users/anthonyoshima/Documents/WelcometoTED/Claude_Projects/pixel_pet
   http-server -p 8000
   ```

3. Open browser to `http://localhost:8000`

### Using PHP (if you have it)

```bash
cd /Users/anthonyoshima/Documents/WelcometoTED/Claude_Projects/pixel_pet
php -S localhost:8000
```

Then open `http://localhost:8000`

## Option 2: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Click "Open with Live Server"
4. Game opens automatically in browser!

## Option 3: Direct File Access (May Have Issues)

⚠️ **Not recommended** - CORS errors may prevent assets from loading

You can try opening `index.html` directly in your browser, but modern browsers block local file access for security reasons.

---

## 🎮 Game Controls

- **SPACE BAR** or **CLICK/TAP** - Jump
- **ESC** - Return to menu (on game over screen)

---

## 🎯 MVP Features Included

✅ **Character Selection**
- Choose between Velma (dog) or Negro (cat)
- Both characters have identical mechanics

✅ **Core Gameplay**
- Auto-running character
- Jump to avoid obstacles
- Collect food items for points

✅ **Lives System**
- Start with 3 hearts ❤️❤️❤️
- Lose 1 heart per hit
- 1.5 seconds invincibility after damage
- Game over when all hearts lost

✅ **Combo System**
- Collect food consecutively = combo multiplier
- Up to 5x multiplier
- Combo resets on hit or 3 second timeout

✅ **Difficulty Scaling**
- Game speed increases over time
- Obstacles become more frequent

✅ **Scoring**
- Different food items worth different points
- Combo multiplier increases point values
- High score persistence (saved in browser)

✅ **Food & Obstacles**
- 12 different food sprites
- Ground spikes
- Flying bees
- Random spawning

✅ **Polish**
- Smooth animations
- Particle effects on collection
- Screen shake on damage
- Flashing invincibility frames
- Character rotation during jump

---

## 🐛 Troubleshooting

### Assets Not Loading?

Make sure:
1. Character sprites are in `assets/characters/`
   - Copy `dog.png` from Desktop
   - Copy `cat.png` from Desktop
2. You're running a local server (not opening file directly)
3. All asset paths are correct

### Cat/Dog Images Missing?

You still need to manually copy:
- `/Users/anthonyoshima/Desktop/Screenshot 2026-03-25 at 11.42.30 AM.png` → `assets/characters/dog.png`
- `/Users/anthonyoshima/Desktop/Screenshot 2026-03-25 at 11.43.04 AM.png` → `assets/characters/cat.png`

### Game Won't Start?

Check browser console (F12) for errors and verify:
- Phaser CDN loaded successfully
- All JavaScript files loaded
- No CORS errors

---

## 📂 Project Structure

```
pixel_pet/
├── index.html              # Main HTML file (OPEN THIS)
├── src/
│   ├── main.js            # Game initialization
│   ├── config.js          # Game constants
│   └── scenes/
│       ├── BootScene.js   # Asset loading
│       ├── MenuScene.js   # Character selection
│       ├── GameScene.js   # Main gameplay
│       └── GameOverScene.js # End screen
├── assets/
│   ├── characters/        # Velma & Negro sprites
│   ├── backgrounds/       # Sky and ground tiles
│   ├── items/
│   │   ├── food/         # Food collectibles
│   │   └── obstacles/    # Spikes and enemies
│   └── ui/               # UI elements
└── docs/
    ├── GAME_SPEC.md      # Complete specification
    ├── CHARACTERS.md     # Character details
    └── HOW_TO_RUN.md     # This file!
```

---

## 🎉 Enjoy Playing!

Once the server is running and assets are in place, you should see:

1. **Loading Screen** - Brief asset loading
2. **Main Menu** - Choose Velma or Negro
3. **Gameplay** - Jump, collect food, avoid obstacles!
4. **Game Over** - See your score, replay or return to menu

Have fun! 🐶🐱🍎
