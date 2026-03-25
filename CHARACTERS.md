# Game Characters

## Meet the Stars! 🌟

---

## 🐶 Velma - The Orange Dog

**File**: `assets/characters/dog.png`

**Appearance**:
- Orange and brown fur (corgi-style)
- Big happy eyes
- Cheerful expression
- Floppy ears

**Personality**:
- Energetic and playful
- Always wagging (well, if she had tail animation!)
- Loves bones and treats
- Sunshine personality

**In-Game**:
- Same mechanics as Negro
- Identical jump height, speed, and hitbox
- Pure cosmetic difference

**Fun Fact**: Velma would collect ALL the food if she could!

---

## 🐱 Negro - The Black Cat

**File**: `assets/characters/cat.png`

**Appearance**:
- Fluffy black fur
- Bright yellow eyes
- Pink nose
- Whiskers and pointed ears

**Personality**:
- Sleek and mysterious
- Graceful movements
- Loves fish and seafood
- Night owl energy

**In-Game**:
- Same mechanics as Velma
- Identical jump height, speed, and hitbox
- Pure cosmetic difference

**Fun Fact**: Negro is always up for a midnight snack run!

---

## Character Selection

Players choose their favorite character at the main menu before starting each game session:

```
┌─────────────────────────────────────┐
│     Choose Your Character!          │
├─────────────────────────────────────┤
│                                     │
│      [🐶]              [🐱]        │
│     Velma             Negro         │
│   (Click Me)        (Click Me)      │
│                                     │
│         [    START    ]             │
│                                     │
│      High Score: 3420               │
└─────────────────────────────────────┘
```

**Selection Behavior**:
- Click on character sprite or name to select
- Selected character gets highlight border/glow
- Character stays the same for entire run
- Can change character after game over by returning to menu

---

## Gameplay Notes

### Equal Abilities
Both Velma and Negro have **identical gameplay mechanics**:
- ✅ Same running speed
- ✅ Same jump height and arc
- ✅ Same hitbox size
- ✅ Same collision detection
- ✅ Same food preferences (both collect all food types)

### Visual Differences Only
The choice is purely **cosmetic and personal preference**:
- Play as the character you like more!
- Switch between them for variety
- No competitive advantage either way

### Future Potential
While both characters play the same now, future updates could add:
- Unique animations (tail wag for Velma, purr for Negro)
- Character-specific sound effects
- Special abilities or power-ups
- Character-themed bonus levels

---

## Character Stats (Current)

| Stat | Velma 🐶 | Negro 🐱 |
|------|----------|----------|
| Speed | 200 px/s | 200 px/s |
| Jump Force | -450 | -450 |
| Lives | 3 ❤️ | 3 ❤️ |
| Size | 64x64 px | 64x64 px |
| Special Ability | None | None |
| Cuteness | 100% | 100% |

---

## Display Guidelines

### Main Menu
- Show both characters prominently
- Display names clearly below each sprite
- Use readable font (16-20px)
- Highlight selected character with border/glow

### In-Game HUD
- Character name not shown during gameplay (keeps UI clean)
- Could add small character icon next to hearts (optional)

### Game Over Screen
- Show character name: "Negro ran 1250 points!"
- Or: "Velma collected 85 food items!"
- Display selected character sprite
- Personalize the game over message

### Code Reference
```javascript
// Character data structure
const characters = {
  dog: {
    name: "Velma",
    sprite: "assets/characters/dog.png",
    description: "The cheerful orange dog"
  },
  cat: {
    name: "Negro",
    sprite: "assets/characters/cat.png",
    description: "The sleek black cat"
  }
};

// Example usage
const selectedCharacter = characters.dog;
console.log(`Playing as: ${selectedCharacter.name}`); // "Playing as: Velma"
```

---

## Asset Files

**Location**: `/assets/characters/`

**Files**:
- `dog.png` - Velma, the orange dog (to be added from Desktop)
- `cat.png` - Negro, the black cat (to be added from Desktop)

**TODO**:
- [ ] Copy dog image from Desktop and rename to `dog.png`
- [ ] Copy cat image from Desktop and rename to `cat.png`
- [ ] Verify both images load correctly in browser
- [ ] Test character selection in main menu

---

## Credits

**Character Design**: Original pixel art
**Names**: Velma (dog) & Negro (cat)
**Created for**: Velma & Negro: Food Runner game

---

Enjoy playing as Velma or Negro! 🎮
