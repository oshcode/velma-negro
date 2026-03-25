# Asset Inventory - Organized and Ready! ✅

All 374 assets from your Kenney packs have been sorted into the appropriate folders.

## 📊 Summary

| Category | Count | Location |
|----------|-------|----------|
| **Characters** | 51 | `assets/characters/` |
| **Food Items** | 112 | `assets/items/food/` |
| **Obstacles** | 9 | `assets/items/obstacles/` |
| **Backgrounds** | 41 | `assets/backgrounds/` |
| **UI Elements** | 161 | `assets/ui/` |
| **TOTAL** | 374 | |

---

## 🎮 Characters (51 sprites)

### Human Characters (5 colors × 9 animations each = 45 sprites)
You have characters in: **Beige, Green, Pink, Purple, Yellow**

Each character has these animations:
- `character_[color]_idle.png` - Standing still
- `character_[color]_walk_a.png` & `walk_b.png` - Walking animation (2 frames)
- `character_[color]_jump.png` - Jumping
- `character_[color]_climb_a.png` & `climb_b.png` - Climbing (2 frames)
- `character_[color]_duck.png` - Ducking/crouching
- `character_[color]_front.png` - Front facing
- `character_[color]_hit.png` - Taking damage

### Animal Characters (6 sprites)
- `mouse_rest.png` - Mouse standing (could be your "cat" alternative!)
- `mouse_walk_a.png` & `mouse_walk_b.png` - Mouse walking
- `frog_rest.png` - Frog standing
- `frog_idle.png` - Frog idle
- `frog_jump.png` - Frog jumping

**💡 Recommendation for your game:**
- Use **mouse sprites** as one character option
- Use **frog sprites** as another character option
- Or pick any colored human character (yellow and pink are most visible!)

---

## 🍎 Food Items (112 sprites)

Your food pack includes:

### Baked Goods
- **Cookies** - Various types (chocolate chip, sandwich, etc.)
- **Crackers** - Different shapes and sizes
- **Cake slices** - Multiple variations
- **Donuts** - With and without icing

### Snacks & Sweets
- **Candy** - Lollipops, candy canes, wrapped candies
- **Ice cream** - Cones and scoops
- **Chocolate bars**
- **Cupcakes**

### Savory Food
- **Burgers** - Multiple variations
- **Hot dogs** - With different toppings
- **Bread/Baguettes**
- **Pizza slices** (if available)

### Drinks
- **Bottles** - Various colors (soda, juice)
- **Milk cartons**
- **Cups/Mugs**
- **Glasses**

### Special Items
- **Wrapped presents** (bonus items!)
- **Cheese**
- **Other collectibles**

All files named `tile_0000.png` through `tile_0111.png`

**💡 For your game:**
- Use **different colors = different point values**
  - Gold/yellow items = 10 points
  - Red/pink items = 5 points
  - Blue/purple items = 3 points
- **Larger items** (burgers, cakes) = more points
- **Small items** (cookies, candy) = less points but easier to collect

---

## ⚠️ Obstacles (9 sprites)

### Hazards
- `block_spikes.png` - **Ground spikes** (main obstacle!)
- `bomb.png` - Inactive bomb
- `bomb_active.png` - Explosive bomb (danger!)

### Flying Enemies (can be obstacles to avoid)
- `bee_rest.png` - Bee standing
- `bee_a.png` & `bee_b.png` - Bee flying animation
- `fly_rest.png` - Fly standing
- `fly_a.png` & `fly_b.png` - Fly animation

**💡 For your game:**
- `block_spikes.png` - Place on ground as main obstacle
- `bee` or `fly` sprites - Flying obstacles at different heights
- `bomb_active.png` - Special hazard that appears occasionally

---

## 🏞️ Backgrounds (41 tiles)

### Background Layers (Parallax scrolling)
- `background_clouds.png` - Cloud layer
- `background_color_desert.png` - Desert scene
- `background_color_hills.png` - **Hills scene (recommended!)**
- `background_color_trees.png` - Forest scene
- `background_color_mushrooms.png` - Mushroom forest

### Fading Backgrounds
- `background_fade_desert.png`
- `background_fade_hills.png`
- `background_fade_trees.png`
- `background_fade_mushrooms.png`

### Solid Color Tiles (for ground/platforms)
- `background_solid_sky.png` - **Sky blue (recommended for background)**
- `background_solid_grass.png` - **Green grass (recommended for ground!)**
- `background_solid_dirt.png` - Brown dirt
- `background_solid_sand.png` - Desert sand
- `background_solid_cloud.png` - White clouds

### Platform Blocks
You also have various `block_*.png` and `brick_*.png` files for building platforms:
- Brown and grey bricks
- Colored blocks (blue, red, green, yellow)
- Plank platforms
- Bridge pieces

**💡 For your game:**
1. **Sky**: Use `background_solid_sky.png` or `background_color_hills.png`
2. **Ground**: Use `background_solid_grass.png` (tileable!)
3. **Parallax**: Add `background_clouds.png` for depth
4. **Platforms**: Use `brick_brown.png` or `block_plank.png`

---

## 🎨 UI Elements (161 tiles)

Your UI pack includes buttons, panels, icons, and decorative elements in various styles:

### Buttons & Panels
- Square buttons (various sizes)
- Rectangular panels
- Circular buttons
- Frames and borders

### Colors Available
- Brown/Tan
- Blue
- Grey
- Multiple shades of each

### Icons & Symbols
- Checkmarks
- X marks
- Arrows
- Stars
- Hearts
- Coins
- Settings gear
- Play/pause buttons
- Sound/music toggles

All files named `tile_0000.png` through `tile_0160.png`

**💡 For your game UI:**
Look through the tiles to find:
1. **Play button** - For start screen
2. **Restart button** - For game over
3. **Score panel** - Background for score display
4. **Heart icons** - For lives (if you add them)
5. **Pause icon** - For pause menu
6. **Numbers** - For score display (or use custom font)

---

## 🚀 Quick Start Guide

### For Your Auto-Runner Game

**1. Choose Your Character:**
- Start with `mouse_walk_a.png` and `mouse_walk_b.png` for running
- Use `mouse_rest.png` for idle/menu screen
- Or use `frog_jump.png` for a jumping character

**2. Pick 5 Food Items to Start:**
Browse `assets/items/food/` and pick your favorites:
- tile_0000 to tile_0111
- Mix of different types (cookies, donuts, burgers, etc.)

**3. Set Up Obstacles:**
- `block_spikes.png` - Main ground hazard
- `bee_a.png` and `bee_b.png` - Flying obstacle
- `bomb_active.png` - Special danger

**4. Create Your Background:**
- Sky: `background_solid_sky.png`
- Ground: `background_solid_grass.png` (repeat horizontally)
- Optional: `background_clouds.png` for parallax effect

**5. Add UI:**
Browse `assets/ui/` tiles to find:
- A button for "Start"
- A panel for score display
- A restart icon

---

## 📝 File Naming Conventions

### Characters
Format: `character_[color]_[action].png` or `[animal]_[action].png`

### Food Items
Format: `tile_XXXX.png` (numbered 0000-0111)
- You'll need to preview them to see what each one is!

### Obstacles
Self-descriptive names like `block_spikes.png`, `bomb.png`, etc.

### Backgrounds
Format: `background_[type]_[style].png`

### UI
Format: `tile_XXXX.png` (numbered 0000-0160)
- Browse to find what you need!

---

## 💡 Tips for Using These Assets

### Animation
For walking/running:
- Use 2-frame loop: `_a.png` → `_b.png` → repeat
- Switch frames every 100-150ms for smooth animation

### Scaling
- Keep all sprites at the same scale (don't mix sizes)
- Recommended: 2x or 3x scale for crisp pixels
- Use nearest-neighbor scaling (no blur!)

### Collecting Food
Make food items disappear when collected:
- Add a small "pop" animation (scale up then fade)
- Play a satisfying sound effect
- Add points to score instantly

### Obstacles
- Make spikes very visible (don't blend with ground)
- Flying obstacles should move in patterns (up/down, sine wave)
- Add warning before bombs explode

---

## 🎉 You're Ready to Build!

All assets are organized and ready to use. Start by:

1. Load one character sprite
2. Load one food item
3. Load ground tile
4. Get them displaying on screen
5. Add movement
6. Add collision detection
7. Then expand with more variety!

**Remember**: Simple is better! Geometry Dash succeeded with minimal graphics. Focus on gameplay first!

---

## 📄 License

All these assets are from **Kenney.nl** and are **CC0 (Public Domain)**:
- ✅ Use in personal projects
- ✅ Use in commercial projects
- ✅ Modify and edit freely
- ✅ No attribution required (but appreciated!)

Optional credit: "Assets by Kenney.nl"
