class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading screen
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Bright gradient background
        this.add.rectangle(0, 0, width, height, 0xFFE5F1).setOrigin(0, 0);

        // Game title - top line
        const title1 = this.add.text(width / 2, height / 2 - 120, "VELMA & NEGRO'S", {
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Game title - bottom line
        const title2 = this.add.text(width / 2, height / 2 - 85, 'ADVENTURES', {
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#00E5FF',
            stroke: '#FFFFFF',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Fun bounce animations for title
        this.tweens.add({
            targets: title1,
            y: height / 2 - 123,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.tweens.add({
            targets: title2,
            y: height / 2 - 88,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 + 20, 'Loading...', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#B865FF',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Animate loading text
        this.tweens.add({
            targets: loadingText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Progress bar background
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xFFFFFF, 1);
        progressBox.fillRect(width / 2 - 160, height / 2 + 60, 320, 50);
        progressBox.lineStyle(4, 0xFF69B4, 1);
        progressBox.strokeRect(width / 2 - 160, height / 2 + 60, 320, 50);

        // Progress bar fill
        const progressBar = this.add.graphics();

        // Decorative stars
        const stars = ['★', '✨', '💫', '⭐'];
        const starColors = ['#FF69B4', '#00E5FF', '#FFE135', '#B865FF'];
        const starObjs = [];

        stars.forEach((star, i) => {
            const angle = (i / stars.length) * Math.PI * 2;
            const radius = 100;
            const x = width / 2 + Math.cos(angle) * radius;
            const y = height / 2 - 100 + Math.sin(angle) * radius;

            const starText = this.add.text(x, y, star, {
                fontSize: '24px',
                fill: starColors[i]
            }).setOrigin(0.5);

            starObjs.push(starText);

            // Rotate and scale animation
            this.tweens.add({
                targets: starText,
                angle: 360,
                scale: 1.4,
                duration: 2000 + i * 300,
                yoyo: true,
                repeat: -1
            });
        });

        // Loading progress
        this.load.on('progress', (value) => {
            progressBar.clear();

            // Rainbow gradient effect based on progress
            const colors = [0xFF69B4, 0x00E5FF, 0xFFE135, 0x00FF88];
            const colorIndex = Math.floor(value * (colors.length - 1));
            const color = colors[colorIndex];

            progressBar.fillStyle(color, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 70, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            title1.destroy();
            title2.destroy();
            starObjs.forEach(star => star.destroy());
        });

        // Load assets
        // Characters
        this.load.image('dog', 'assets/characters/dog-Photoroom.png');
        this.load.image('cat', 'assets/characters/cat-Photoroom.png');

        // Background
        this.load.image('sky', 'assets/backgrounds/background_solid_sky.png');
        this.load.image('ground', 'assets/backgrounds/background_solid_grass.png');
        this.load.image('park', 'assets/backgrounds/background_color_trees.png');
        this.load.image('clouds', 'assets/backgrounds/background_clouds.png');
        this.load.image('dirt', 'assets/backgrounds/background_solid_dirt.png');

        // Obstacles
        this.load.image('spike', 'assets/items/obstacles/block_spikes.png');
        this.load.image('bee1', 'assets/items/obstacles/bee_a.png');
        this.load.image('bee2', 'assets/items/obstacles/bee_b.png');

        // Food items (loading a selection)
        for (let i = 0; i < 12; i++) {
            const num = i.toString().padStart(4, '0');
            this.load.image(`food${i}`, `assets/items/food/tile_${num}.png`);
        }

        // UI Elements (we'll use text for MVP, can add sprites later)
    }

    create() {
        // Start the menu scene
        this.scene.start('MenuScene');
    }
}
