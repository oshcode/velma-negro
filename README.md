# Velma & Negro: Food Runner 🐶🐱🍎

An auto-runner game (Geometry Dash style) where Velma the dog and Negro the cat collect food and avoid obstacles!

## Game Concept

- **Genre**: Endless auto-runner / obstacle course
- **Characters**: Velma (dog) and Negro (cat) - player can choose
- **Goal**: Collect as much food as possible while moving right
- **Obstacles**: Spikes, hazards, and bad food items
- **Score**: Based on food collected and distance traveled
- **Lives**: 3 hearts - lose 1 per hit

## Getting Started

### 1. Download Assets (Start Here!)
📖 **Read `QUICK_START_ASSETS.md`** - 5-minute guide to get all assets you need!

📚 **Full details in `ASSET_SOURCES.md`** - Complete list of free pixel art resources

**Quick Start**: Visit [Kenney.nl](https://kenney.nl/assets) and download:
- Animal Pack (for cat & dog)
- Food Pack (for collectibles)
- Abstract Platformer (for spikes/obstacles)

### 2. Project Structure

```
pixel_pet/
├── assets/              # All game graphics
│   ├── characters/      # Cat and dog sprites
│   ├── items/
│   │   ├── food/        # Collectible food items
│   │   └── obstacles/   # Spikes and hazards
│   ├── backgrounds/     # Ground tiles and sky
│   └── ui/              # Score, buttons, menus
├── src/                 # Game code (create when ready)
└── docs/                # Documentation
```

### 3. Game Features to Implement

Core mechanics:
- ✅ Character runs automatically to the right
- ✅ Player controls: Jump (tap/click)
- ✅ Collect food items for points
- ✅ Avoid obstacles (collision = game over)
- ✅ Track high score
- ✅ Character selection (cat or dog)

Optional enhancements:
- 🌟 Double jump mechanic
- 🌟 Power-ups (speed boost, shield)
- 🌟 Parallax scrolling backgrounds
- 🌟 Sound effects and music
- 🌟 Progressive difficulty (faster over time)

## Next Steps

1. **Get Assets** → Read `QUICK_START_ASSETS.md` and download pixel art
2. **Choose Engine** → Pick a game framework (see recommendations below)
3. **Build MVP** → Start with simple character movement and one food item
4. **Add Obstacles** → Implement collision detection
5. **Polish** → Add UI, sounds, and juice!

## Game Engine Recommendations

### For Beginners:
- **Scratch** - Visual programming, perfect for prototyping
- **Construct 3** - Drag-and-drop game maker
- **GDevelop** - No coding required

### For Web (JavaScript/HTML5):
- **Phaser 3** - Popular, good docs, runs in browser
- **Kaboom.js** - Super simple for beginners
- **p5.play** - Built on p5.js, very beginner-friendly

### For Python:
- **Pygame** - Classic choice, lots of tutorials
- **Arcade** - Modern, easier than Pygame

### For More Control:
- **Godot** - Free, open-source, 2D-focused
- **Unity** - Industry standard (heavier)

## Useful Tools

- **Piskel** (piskelapp.com) - Free online pixel art editor
- **Aseprite** - Best pixel art tool ($20)
- **GIMP** - Free image editor
- **Audacity** - Free sound editing

## Documentation

- 📘 **README.md** (this file) - Project overview
- 🎨 **ASSET_SOURCES.md** - Complete asset resource guide
- ⚡ **QUICK_START_ASSETS.md** - Fast-track asset download guide
- 📁 **assets/README.md** - Asset folder organization

---

**Remember**: Start simple! Get a cat running and collecting one apple before adding everything else. Geometry Dash started simple too!
