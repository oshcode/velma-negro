// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: GameConfig.WIDTH,
    height: GameConfig.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // Set to true to see hitboxes
        }
    },
    scene: [
        BootScene,
        MenuScene,
        GameScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameConfig.WIDTH,
        height: GameConfig.HEIGHT,
        min: {
            width: GameConfig.WIDTH,
            height: GameConfig.HEIGHT
        }
    }
};

// Create the game instance
const game = new Phaser.Game(config);
