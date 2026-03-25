# Cat & Dog Food Runner - Game Specification

**Genre**: Endless Auto-Runner
**Platform**: Web (HTML5)
**Engine**: Phaser 3
**Style**: Pixel Art, Cute/Casual
**Inspiration**: Geometry Dash + Flappy Bird

---

## 🎮 Game Overview

Players choose between two adorable characters: **Velma** (a cheerful orange dog) or **Negro** (a sleek black cat). The chosen character automatically runs to the right, jumping to collect food items for points while avoiding obstacles. The game increases in difficulty over time through faster movement speed and more frequent obstacles. A combo multiplier rewards skilled play, and players have 3 lives (hearts) before game over.

---

## 🎯 Core Mechanics

### 1. Movement
- **Auto-run**: Character moves right automatically at constant speed
- **Jump**: Player taps/clicks to jump (single jump only, no double jump)
- **Gravity**: Character falls back down after jumping
- **Ground level**: Character runs on a fixed ground plane

### 2. Scoring System
- **Base points**: Each food item has a point value (varies by type)
- **Combo multiplier**: Collecting food consecutively increases multiplier
  - 1st item: 1x points
  - 2nd item in a row: 2x points
  - 3rd item in a row: 3x points
  - Max combo: 5x multiplier
  - Missing an item or hitting obstacle resets combo to 1x
- **High score**: Tracked and displayed, persists across sessions (localStorage)

### 3. Difficulty Progression
- **Speed increase**: Base running speed increases gradually (every 500 points or 30 seconds)
- **Obstacle frequency**: More obstacles spawn as game progresses
- **Scaling**:
  - Start speed: 200 pixels/second
  - Max speed: 450 pixels/second
  - Obstacle spawn rate: 1 every 2-3 seconds → 1 every 1-1.5 seconds

### 4. Lives/Health System
- **Starting lives**: Player begins with 3 hearts ❤️❤️❤️
- **Losing a life**: Hit obstacle → lose 1 heart + brief invincibility (1.5 seconds)
- **Game over**: All 3 hearts lost → game over screen
- **Invincibility frames**: After taking damage, character flashes and cannot be hurt temporarily
- **Combo reset**: Hitting obstacle resets combo multiplier to 1x
- **Heart recovery**: (Optional) Very rare "heart" food item restores 1 heart (max 3)

### 5. Collision Detection
- **Food collection**: Character overlaps food → collect + add points + increase combo
- **Obstacle hit**: Character overlaps obstacle → lose 1 heart + invincibility frames
- **Game over trigger**: Lose heart when already at 0 hearts
- **Hitbox**: Use sprite bounds with slight padding for forgiving collision

### 6. Character Selection
- **Menu screen**: Player chooses Velma (dog) or Negro (cat) before starting
- **No switching**: Selected character stays for entire run
- **Visual difference only**: Both characters have identical mechanics (same jump, speed, hitbox)
- **Character preview**: Show both options with their names and highlighting
- **Display**: "Velma" label under dog sprite, "Negro" label under cat sprite

---

## 🎨 Asset List & File Paths

### Characters

#### Velma - The Dog (Player Option 1)
- **Name**: Velma
- **File**: `assets/characters/dog.png`
- **Description**: Orange/brown corgi-style dog with happy expression
- **Size**: ~300-400px (will scale down to ~64px in-game)
- **Animation**: Static sprite (rotate slightly during jump)
- **Usage**: Main character option 1
- **Personality**: Cheerful, energetic, loves bones and treats

#### Negro - The Cat (Player Option 2)
- **Name**: Negro
- **File**: `assets/characters/cat.png`
- **Description**: Black fluffy cat with yellow eyes
- **Size**: ~300-400px (will scale down to ~64px in-game)
- **Animation**: Static sprite (rotate slightly during jump)
- **Usage**: Main character option 2
- **Personality**: Sleek, mysterious, loves fish

### Food Items (Collectibles)
All food items are located in: `assets/items/food/`

**Recommended items for game** (select 8-12 varieties):

**High Value (10 points base)**:
- `tile_0XXX.png` - Look for: burgers, cakes, large items
- Rare spawn rate: 15%

**Medium Value (5 points base)**:
- `tile_0XXX.png` - Look for: donuts, cookies, hot dogs
- Common spawn rate: 50%

**Low Value (3 points base)**:
- `tile_0XXX.png` - Look for: candy, small items
- Very common spawn rate: 35%

**Notes**:
- Preview files in `assets/items/food/` folder (112 total options)
- Choose visually distinct items that are easy to recognize
- Ensure good color variety for visual appeal
- Files are named `tile_0000.png` through `tile_0111.png`

### Obstacles (Hazards)
Located in: `assets/items/obstacles/`

**Primary Obstacles**:
1. **Ground Spikes**
   - File: `block_spikes.png`
   - Placement: On ground level
   - Spawn frequency: Most common (60%)

2. **Flying Bee**
   - Files: `bee_a.png`, `bee_b.png` (2-frame animation)
   - Placement: Mid-air (various heights)
   - Spawn frequency: Common (25%)

3. **Flying Fly**
   - Files: `fly_a.png`, `fly_b.png` (2-frame animation)
   - Placement: Lower mid-air
   - Spawn frequency: Common (15%)

4. **Bomb** (optional)
   - Files: `bomb.png` or `bomb_active.png`
   - Placement: On ground or floating
   - Spawn frequency: Rare special hazard

### Backgrounds
Located in: `assets/backgrounds/`

**Sky/Background Layer**:
- `background_solid_sky.png` - Light blue sky (static or slow parallax)
- `background_clouds.png` - Cloud layer (optional parallax effect)

**Ground/Platform Layer**:
- `background_solid_grass.png` - Green grass tile (repeating)
- OR `brick_brown.png` - Brown platform tile
- **Repeat horizontally**: Tile this image infinitely scrolling left

**Background Elements** (optional decorative parallax):
- `background_color_hills.png` - Hills in background
- `background_fade_trees.png` - Trees for depth

### UI Elements
Located in: `assets/ui/`

Browse `tile_0000.png` through `tile_0160.png` to find:

**Required UI Elements**:
1. **Play Button** - For start screen
2. **Restart Button** - For game over screen
3. **Pause Button** - Small icon in corner
4. **Score Panel** - Background for score display
5. **Character Selector** - Border/highlight for menu
6. **Heart Icon** - For lives display (need 3 copies: full heart, empty heart)
   - Look for heart-shaped tiles or use emoji ❤️ as fallback

**Text**:
- Use web fonts for score/text (easier than pixel fonts)
- Options: "Press Start 2P", "VT323", or "Silkscreen" (Google Fonts)

---

## 🎯 Game States & Screens

### 1. Main Menu
**Elements**:
- Game title text: "Velma & Negro: Food Runner"
- "Choose Your Character" text
- Velma (dog) sprite with name label (clickable/selectable)
- Negro (cat) sprite with name label (clickable/selectable)
- Highlight/border around selected character
- "Start" button (or "Press Space to Start")
- High score display

**Character Display**:
```
   [🐶]           [🐱]
  Velma          Negro
 (click me)    (click me)
```

**User Flow**:
1. Player sees both characters with their names
2. Click Velma or Negro to select (highlight appears)
3. Click Start or press Space → transitions to Game

### 2. Game Play
**HUD Elements**:
- Current score (top left, large font)
- Lives/Hearts (top left, below score): ❤️❤️❤️
- Current combo multiplier (e.g., "x3 COMBO!")
- High score (smaller, top right)
- Pause button (top right corner)

**Layout**:
```
┌─────────────────────────────────────────┐
│ Score: 1250  ❤️❤️❤️  [High: 3420] [||] │ ← HUD
├─────────────────────────────────────────┤
│                                         │
│          [Sky Background]               │
│                                         │
│    🐱    🍪    🔺    🍔    🐝         │ ← Game area
│                                         │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│ ← Ground
└─────────────────────────────────────────┘

         x3 COMBO! ← Combo indicator (center)
```

**Gameplay Loop**:
1. Character runs right automatically
2. Food items and obstacles spawn from right, move left
3. Player taps/clicks to jump
4. Collect food → increase score & combo
5. Hit obstacle → lose 1 heart + brief invincibility
6. Lose all 3 hearts → game over
7. Speed gradually increases

### 3. Game Over
**Elements**:
- "GAME OVER" text
- Character name (e.g., "Negro ran 1250 points!")
- Final score (large)
- "NEW HIGH SCORE!" text (if applicable)
- Previous high score
- Selected character sprite
- Restart button (replay as Negro/Velma)
- Main menu button (choose different character)

**User Flow**:
1. Show game over screen with character name and scores
2. Click Restart → new game with same character (Velma or Negro)
3. Click Menu → return to character selection

### 4. Pause Menu (optional)
**Elements**:
- "PAUSED" text
- Resume button
- Restart button
- Main menu button

---

## 🔧 Technical Requirements

### Game Configuration

```javascript
// Game dimensions
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// Physics
const GRAVITY = 1200;
const JUMP_VELOCITY = -450;
const GROUND_Y = 480; // Y position of ground

// Character
const PLAYER_X = 150; // Fixed X position (left side of screen)
const PLAYER_SIZE = 64; // Scaled size in game
const PLAYER_START_SPEED = 200; // Pixels per second

// Difficulty scaling
const SPEED_INCREASE_INTERVAL = 500; // Points between speed increases
const SPEED_INCREASE_AMOUNT = 20; // Pixels/second to add
const MAX_SPEED = 450;

// Spawning
const MIN_SPAWN_INTERVAL = 1500; // Milliseconds
const MAX_SPAWN_INTERVAL = 3000;
const OBSTACLE_SPAWN_RATIO = 0.4; // 40% obstacles, 60% food

// Combo system
const COMBO_TIMEOUT = 3000; // Milliseconds before combo resets
const MAX_COMBO = 5;

// Lives/Health system
const STARTING_LIVES = 3;
const INVINCIBILITY_DURATION = 1500; // Milliseconds after taking damage
const FLASH_INTERVAL = 100; // Character flash speed when invincible
```

### Phaser 3 Scenes

**Scene 1: MainMenuScene**
- Character selection screen
- High score display
- Start button

**Scene 2: GameScene**
- Main gameplay
- Spawning system
- Collision detection
- Scoring logic
- Pause functionality

**Scene 3: GameOverScene**
- Score display
- Restart/menu options

### Core Systems to Implement

#### 1. Spawning System
```javascript
// Pseudo-code
spawnObject() {
  const isObstacle = Math.random() < OBSTACLE_SPAWN_RATIO;

  if (isObstacle) {
    spawnRandomObstacle(); // spike, bee, or fly
  } else {
    spawnRandomFood(); // based on rarity tiers
  }

  // Next spawn time (decreases with difficulty)
  scheduleNextSpawn();
}
```

#### 2. Combo System
```javascript
// Pseudo-code
collectFood(foodValue) {
  const pointsEarned = foodValue * currentCombo;
  score += pointsEarned;

  if (currentCombo < MAX_COMBO) {
    currentCombo++;
  }

  resetComboTimer(); // Reset 3-second timer
  showComboText(); // Visual feedback
}

resetCombo() {
  currentCombo = 1;
  hideComboText();
}
```

#### 3. Difficulty Scaling
```javascript
// Pseudo-code
update() {
  // Speed scaling
  if (score % SPEED_INCREASE_INTERVAL === 0 && speed < MAX_SPEED) {
    speed += SPEED_INCREASE_AMOUNT;
  }

  // Spawn rate scaling
  const currentSpawnRate = lerp(
    MAX_SPAWN_INTERVAL,
    MIN_SPAWN_INTERVAL,
    score / 5000
  );
}
```

#### 4. Collision Detection
```javascript
// Pseudo-code
checkCollisions() {
  // Food collection
  physics.overlap(player, foodGroup, collectFood);

  // Obstacle collision (only if not invincible)
  if (!player.isInvincible) {
    physics.overlap(player, obstacleGroup, hitObstacle);
  }
}

hitObstacle() {
  lives--;
  updateHeartsDisplay(); // Remove one heart from UI
  resetCombo(); // Reset combo multiplier

  if (lives <= 0) {
    gameOver();
  } else {
    // Temporary invincibility
    player.isInvincible = true;
    startFlashingAnimation(); // Visual feedback

    setTimeout(() => {
      player.isInvincible = false;
      stopFlashingAnimation();
    }, INVINCIBILITY_DURATION);
  }
}
```

---

## 🎨 Visual Polish & Juice

### Animation Effects

**Player**:
- Idle: Subtle bob animation (optional)
- Jump: Rotate character 15° during jump
- Land: Small dust particle effect
- Collect food: Scale up briefly (1.1x for 100ms)
- **Taking damage**: Flash red briefly, then flicker (alpha 0.5 ↔ 1.0) during invincibility
- **Invincibility**: Character flashes/blinks for 1.5 seconds after being hit

**Food Items**:
- Spawn: Scale from 0 to 1 (200ms ease)
- Idle: Gentle floating animation (bob up/down 5px)
- Collect: Scale up + fade out, particle burst
- Despawn: Fade out when scrolled off screen

**Obstacles**:
- Bees/Flies: Wing animation (2 frames, 100ms each)
- Spikes: Static (or subtle pulse warning)
- Bombs: Blinking animation when active

**Combo Indicator**:
- Show text with scale animation when combo increases
- Color based on combo level:
  - 1x: White
  - 2x: Yellow
  - 3x: Orange
  - 4x: Red
  - 5x: Rainbow/Gold pulsing

### Sound Effects (to add later)
- Jump: "Boing" sound
- Collect food: "Pop" or "Ding" (pitch increases with combo)
- Hit obstacle: "Crash" or "Ouch"
- Combo milestone: Special chime
- Background music: Upbeat chiptune loop

### Particle Effects
- Food collection: Small stars/sparkles burst
- Landing: Small dust cloud
- Obstacle hit: Small explosion effect
- Combo milestone (5x): Special burst effect

---

## 📊 Data & Persistence

### LocalStorage
Store in browser localStorage:

```javascript
{
  "highScore": 5420,
  "gamesPlayed": 15,
  "totalScore": 23400,
  "favoriteCharacter": "cat",
  "preferences": {
    "musicVolume": 0.7,
    "sfxVolume": 0.8
  }
}
```

---

## 🚀 Development Phases

### Phase 1: MVP (Minimum Viable Product)
**Goal**: Basic playable game

✅ **Must Have**:
- Player can jump with space bar/click
- One character (cat or dog)
- 3-5 food items spawn
- 2 obstacle types (spikes + one flying)
- Basic collision detection
- Score counting
- Ground and simple background
- Game over on collision
- Restart functionality

❌ **Skip for MVP**:
- Character selection
- Combo multiplier
- Speed scaling
- Polish/animations
- Sound effects

### Phase 2: Core Features
**Add**:
- Character selection menu
- High score persistence
- Combo multiplier system
- Difficulty scaling (speed + obstacles)
- All food varieties (8-12 types)
- All obstacle types
- Proper UI elements

### Phase 3: Polish
**Add**:
- Animation polish (rotation, particles)
- Smooth transitions between scenes
- Visual feedback for combo
- Parallax scrolling background
- Juice effects (screen shake, flash, etc.)

### Phase 4: Audio & Final Polish
**Add**:
- Sound effects
- Background music
- Settings menu (volume control)
- More visual polish
- Bug fixes

---

## 🎯 Success Metrics

**Gameplay**:
- Player can reach 1000+ points without frustration
- Game feels fair (obstacles are visible and dodgeable)
- Combo system is satisfying and rewarding
- Difficulty scales smoothly

**Technical**:
- Runs at 60 FPS on modern browsers
- No memory leaks during extended play
- High score persists correctly
- Responsive controls (minimal input lag)

---

## 📝 Asset Checklist

### Must Have
- [x] Velma (dog) character sprite
- [x] Negro (cat) character sprite
- [ ] 8-12 food sprites selected from food pack
- [ ] Ground spikes obstacle
- [ ] Flying enemy sprites (bee or fly)
- [ ] Ground tile (grass or platform)
- [ ] Sky background
- [ ] UI button sprites (start, restart, pause)
- [ ] Heart icon for lives display (3 hearts in HUD)

### Optional
- [ ] Cloud layer for parallax
- [ ] Background hills/trees
- [ ] Bomb obstacle
- [ ] Additional food varieties
- [ ] Particle textures
- [ ] Menu background

---

## 🔗 Quick Reference

### File Structure
```
pixel_pet/
├── index.html          # Main HTML file
├── src/
│   ├── main.js         # Game initialization
│   ├── scenes/
│   │   ├── MainMenu.js
│   │   ├── GameScene.js
│   │   └── GameOver.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Food.js
│   │   └── Obstacle.js
│   └── config.js       # Game constants
├── assets/             # All game assets
└── style.css           # Basic styling
```

### Key Phaser 3 Features to Use
- `Physics.Arcade` - For collision and gravity
- `Groups` - For managing food/obstacle pools
- `Tweens` - For smooth animations
- `Input.Keyboard/Pointer` - For controls
- `Scene` management - For menus and gameplay
- `Text` objects - For UI and scoring

---

## ❓ Questions for Implementation

Before starting development, consider:

1. **Desktop vs Mobile**: Should the game work on mobile with touch controls?
   - If yes: Use touch/pointer events instead of space bar
   - Recommendation: Support both

2. **Difficulty curve**: Should the game start easy or moderate?
   - Current spec: Starts easy, scales to challenging
   - Alternative: Start at moderate difficulty for experienced players

3. **Game length**: Target session length?
   - Current: Endless until game over
   - Alternative: Levels with checkpoints?
   - Recommendation: Keep endless for auto-runner genre

4. **Retry behavior**: After game over, keep same character or return to menu?
   - Current spec: Quick restart with same character
   - Alternative: Force character reselection
   - Recommendation: Quick restart (with menu button option)

---

## 🎉 Next Steps

1. **Review this spec** - Confirm all requirements match your vision
2. **Select food sprites** - Browse `assets/items/food/` and pick 8-12 favorites
3. **Set up project** - Create HTML file and install Phaser 3
4. **Build MVP** - Start with Phase 1 features
5. **Iterate** - Add features from Phase 2-4

Ready to start building? Let me know if you want to:
- Modify any requirements
- Add/remove features
- Start coding the game
- Get help setting up the project structure
