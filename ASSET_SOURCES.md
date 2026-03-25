# Free Pixel Art Resources for Cat & Dog Auto-Runner Game
## (Geometry Dash-style with food collecting)

## Best Sources for Your Game

### 1. Kenney.nl - Animals & Food (CC0 - Public Domain) ⭐ RECOMMENDED
- **Website**: https://kenney.nl/assets
- **Best Packs for You**:
  - **"Animal Pack"** - Cute cats, dogs, and other animals
  - **"Food Pack"** - All kinds of food items (fruits, snacks, etc.)
  - **"Abstract Platformer"** - Clean geometric obstacles/spikes
  - **"UI Pack"** - Score displays, buttons
- **License**: Public Domain (CC0) - completely free
- **Why it's perfect**: Simple, cohesive art style that works great for auto-runners

### 2. OpenGameArt.org - Search "cat dog pixel"
- **Website**: https://opengameart.org
- **Specific searches**:
  - "pixel cat" or "pixel dog"
  - "food items pixel"
  - "pixel obstacles"
- **Good for**: Finding unique character designs
- **License**: Various (always check)

### 3. Itch.io Free Assets - Runner Game Packs
- **Website**: https://itch.io/game-assets/free/tag-pixel-art
- **Search terms**: "runner", "endless runner", "cute animals"
- **Recommended packs**:
  - Search "pixel pets"
  - Search "food sprites"
  - Look for "runner asset pack"
- **License**: Various (check each)

### 4. Craftpix.net - Cute Animal Assets
- **Free Section**: https://craftpix.net/freebies/
- **Filter by**: Animals, Food, 2D Characters
- **Good for**: Polished, colorful sprites
- **License**: Free with attribution

### 5. Piskel Gallery - Simple Pixel Sprites
- **Website**: https://www.piskelapp.com/gallery
- **Good for**: Quick, simple sprites you can customize
- **Search**: Animals, food items
- **Bonus**: Free online editor to modify them

## What You Need for Your Auto-Runner Game

### Characters (Priority 1) 🐱🐶
- [ ] **Cat sprite** - Running/jumping animation (2-4 frames)
- [ ] **Dog sprite** - Running/jumping animation (2-4 frames)
- [ ] Simple animations work best (running and jumping is enough)
- [ ] Keep them cute and recognizable

### Food Items (Priority 2) 🍎🍕
- [ ] **Good food** to collect (fruits, treats, bones, fish)
  - Apples, bananas, fish, bones, cheese
  - Should be small and easy to see
  - 10-15 different types for variety
- [ ] **Score values** can be shown with colors (gold = more points)

### Obstacles (Priority 3) ⚠️
- [ ] **Spikes** - Classic danger (ground and hanging)
- [ ] **Bad items** - Rotten food, poison, etc.
- [ ] **Hazards** - Fire, water puddles, etc.
- [ ] Keep them visually distinct from good food (use red/dark colors)

### Background (Priority 4) 🏞️
- [ ] **Repeating ground/floor** - Simple tileable pattern
- [ ] **Parallax layers** (optional but nice):
  - Sky/clouds (slowest)
  - Hills/trees (medium speed)
  - Close decorations (fast)
- [ ] Keep backgrounds simple so players can focus on gameplay

### UI Elements (Priority 5) 📊
- [ ] **Score counter** - Large, readable numbers at top
- [ ] **High score display**
- [ ] **Character selector** (switch between cat/dog)
- [ ] **Start/Restart buttons**
- [ ] **Pause icon**
- [ ] Optional: Distance meter showing how far you've traveled

## Download Instructions

1. Visit any of the sources above
2. Download the asset packs (usually .zip files)
3. Extract them to your `assets/` folder
4. Organize by type: characters/, tiles/, items/, ui/, backgrounds/

## File Organization for Your Game

```
assets/
├── characters/
│   ├── cat_run.png          # Cat running animation
│   ├── cat_jump.png         # Cat jumping
│   ├── dog_run.png          # Dog running animation
│   └── dog_jump.png         # Dog jumping
├── items/
│   ├── food/
│   │   ├── apple.png
│   │   ├── fish.png
│   │   ├── bone.png
│   │   └── ... (more food)
│   └── obstacles/
│       ├── spike_ground.png
│       ├── spike_ceiling.png
│       └── hazard_*.png
├── backgrounds/
│   ├── ground.png           # Repeating ground tile
│   ├── sky.png              # Background layer
│   └── clouds.png           # Parallax layer (optional)
└── ui/
    ├── score_numbers.png    # Number spritesheet
    ├── highscore_banner.png
    ├── button_play.png
    ├── button_restart.png
    └── character_select.png
```

## Recommended First Downloads (Start Here!)

### Step 1: Get Kenney's Asset Packs (All Free!)
Go to **kenney.nl** and download these packs:

1. **"Animal Pack"** or search "pixel animals"
   - Extract cats and dogs from the pack
   - Put in `assets/characters/`

2. **"Food Pack"** or browse food-related assets
   - Get various food items
   - Put in `assets/items/food/`

3. **"Abstract Platformer"** or "Jumper Pack"
   - Get spikes and obstacles
   - Put in `assets/items/obstacles/`

4. **"UI Pack"**
   - Get score displays and buttons
   - Put in `assets/ui/`

### Step 2: Quick Alternative - All-in-One Search
If you want a faster approach:
1. Go to **itch.io/game-assets/free**
2. Search: "pixel runner pack" or "endless runner assets"
3. Download a complete pack that has everything
4. Many packs include characters, food, and obstacles together

## Auto-Runner Game Tips

### Animation Needs (Keep It Simple!)
For a Geometry Dash-style game, you don't need complex animations:
- **Running**: 2-4 frames on a loop is enough
- **Jumping**: Can even be a single frame (rotated or tilted)
- **Collecting**: Items can just disappear or have a simple "pop" effect
- Focus on smooth, fast-paced movement

### Size Recommendations
- **Characters**: 32x32 or 64x64 pixels
- **Food items**: 16x16 or 32x32 pixels
- **Obstacles**: 32x32 for consistency
- **Backgrounds**: Tileable patterns (128x128 or 256x256)

### Color Palette Tips
- **Good food**: Bright, warm colors (yellow, orange, red, green)
- **Bad items/obstacles**: Dark colors (black, dark red, purple)
- **Characters**: Make cat and dog easily distinguishable (different colors)
- **Backgrounds**: Muted colors so they don't distract from gameplay

### Pro Tip: Start Small!
Begin with just:
- 1 character (cat OR dog)
- 3 food types
- 2 obstacle types
- 1 simple background

You can always add more variety later!

## License Reminder

Always check the license for each asset:
- **CC0/Public Domain**: Use freely, no attribution required (Kenney.nl uses this!)
- **CC-BY**: Attribution required (credit the creator)
- **Custom licenses**: Read the terms carefully

For Kenney.nl assets: They're CC0, but they appreciate a credit like "Assets by Kenney.nl" (optional)
