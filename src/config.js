// Game Configuration and Constants
const GameConfig = {
    // Game dimensions (iPhone portrait)
    WIDTH: 375,
    HEIGHT: 812,

    // Physics
    GRAVITY: 1100,
    JUMP_VELOCITY: -600,
    GROUND_Y: 680,

    // Character
    PLAYER_X: 80,
    PLAYER_SIZE: 64,
    PLAYER_START_SPEED: 200,

    // Difficulty scaling
    SPEED_INCREASE_INTERVAL: 500,
    SPEED_INCREASE_AMOUNT: 20,
    MAX_SPEED: 450,

    // Spawning
    MIN_SPAWN_INTERVAL: 1200,
    MAX_SPAWN_INTERVAL: 2200,
    OBSTACLE_SPAWN_RATIO: 0.5,

    // Combo system
    COMBO_TIMEOUT: 3000,
    MAX_COMBO: 5,

    // Lives/Health system
    STARTING_LIVES: 3,
    INVINCIBILITY_DURATION: 1500,
    FLASH_INTERVAL: 100,

    // Food point values
    FOOD_VALUES: {
        HIGH: 10,
        MEDIUM: 5,
        LOW: 3
    },

    // Characters
    CHARACTERS: {
        VELMA: {
            name: 'Velma',
            sprite: 'dog',
            description: 'The cheerful orange dog'
        },
        NEGRO: {
            name: 'Negro',
            sprite: 'cat',
            description: 'The sleek black cat'
        }
    }
};
