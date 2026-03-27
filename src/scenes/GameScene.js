class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.selectedCharacter = data.character || 'dog';
        this.characterName = this.selectedCharacter === 'dog' ? 'Velma' : 'Negro';
    }

    create() {
        // Game state
        this.score = 0;
        this.lives = GameConfig.STARTING_LIVES;
        this.combo = 1;
        this.gameSpeed = GameConfig.PLAYER_START_SPEED;
        this.isInvincible = false;
        this.lastComboTime = 0;
        this.isPaused = false;

        // Setup world
        this.setupBackground();
        this.setupPlayer();
        this.setupUI();
        this.setupGroups();
        this.setupControls();

        // Start game music
        soundManager.startMusic('game');

        // Start spawning
        this.isGameOver = false;
        this.scheduleNextSpawn();

        // Difficulty scaling
        this.time.addEvent({
            delay: 5000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });
    }

    setupBackground() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Sky background
        this.add.rectangle(0, 0, width, height, 0x87CEEB).setOrigin(0, 0);

        // Clouds layer (slow parallax) - cover full sky
        this.cloudTiles = this.add.tileSprite(
            0, 0,
            width * 3, height * 0.6,
            'clouds'
        ).setOrigin(0, 0).setScale(1.5);

        // Park/trees layer (medium parallax)
        this.parkTiles = this.add.tileSprite(
            0, height - 350,
            width * 2, 256,
            'park'
        ).setOrigin(0, 0).setScale(1.4);

        // Dirt path (where pet runs)
        this.dirtTiles = this.add.tileSprite(
            0, GameConfig.GROUND_Y - 40,
            width * 2, 140,
            'dirt'
        ).setOrigin(0, 0);

        // Ground grass (fastest parallax - matches game speed)
        this.groundTiles = this.add.tileSprite(
            0, GameConfig.GROUND_Y,
            width * 2, 120,
            'ground'
        ).setOrigin(0, 0);

        // Grass decorations on ground
        this.grassGroup = this.add.group();
        this.spawnInitialGrass();
        this.lastGrassSpawn = 0;
    }

    spawnInitialGrass() {
        // Spawn initial grass tufts across the screen
        for (let x = 0; x < this.cameras.main.width + 200; x += 50) {
            if (Math.random() < 0.7) { // 70% chance to spawn grass at each position
                this.spawnGrassTuft(x + Phaser.Math.Between(-10, 10));
            }
        }
    }

    spawnGrassTuft(x) {
        // Random variation in vertical position
        const grassY = GameConfig.GROUND_Y + Phaser.Math.Between(10, 20);

        // Create a grass tuft (3 small blades)
        const container = this.add.container(x, grassY);

        // 20% chance to spawn a flower instead of just grass
        if (Math.random() < 0.2) {
            // Flower stem
            const stem = this.add.rectangle(0, -3, 2, 8, 0x2d8b3d);
            container.add(stem);

            // Flower petals (small circle)
            const flowerColors = [0xFF69B4, 0xFFD700, 0xFF6347, 0x9370DB, 0xFFFFFF];
            const color = Phaser.Math.RND.pick(flowerColors);
            const flower = this.add.circle(0, -8, 3, color);
            container.add(flower);
        } else {
            // Random number of blades (2-4)
            const bladeCount = Phaser.Math.Between(2, 4);

            // Create grass blades
            for (let i = 0; i < bladeCount; i++) {
                const blade = this.add.triangle(
                    (i - bladeCount / 2) * 3,
                    0,
                    0, Phaser.Math.Between(6, 10),  // random height
                    -2, 0,     // bottom left
                    2, 0,      // bottom right
                    0x2d8b3d   // grass green color
                );
                container.add(blade);
            }
        }

        container.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
        container.setDepth(-1); // Behind player
        this.grassGroup.add(container);
    }

    setupPlayer() {
        this.player = this.physics.add.sprite(
            GameConfig.PLAYER_X,
            GameConfig.GROUND_Y - 50,
            this.selectedCharacter
        );

        this.player.setScale(0.20); // Smaller size to fit under bee enemy
        this.player.setCollideWorldBounds(false);
        this.player.body.setGravityY(GameConfig.GRAVITY);

        // Set player hitbox - smaller for more forgiving collision
        this.player.body.setSize(
            this.player.width * 0.5,
            this.player.height * 0.5
        );
        this.player.body.setOffset(
            this.player.width * 0.25,
            this.player.height * 0.25
        );
    }

    setupGroups() {
        this.foodGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();

        // Collision detection
        this.physics.add.overlap(
            this.player,
            this.foodGroup,
            this.collectFood,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.obstacleGroup,
            this.hitObstacle,
            null,
            this
        );
    }

    setupUI() {
        const textStyle = {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 3
        };

        // Score with fun style
        this.scoreText = this.add.text(15, 55, 'SCORE', textStyle);
        this.scoreValue = this.add.text(15, 75, '0', {
            fontSize: '20px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFE135',
            stroke: '#FFFFFF',
            strokeThickness: 3
        });

        // Lives with bright hearts
        this.livesText = this.add.text(15, 105, '❤️❤️❤️', {
            fontSize: '20px'
        });

        // Combo with fun style
        this.comboText = this.add.text(
            this.cameras.main.width / 2,
            140,
            '',
            {
                fontSize: '22px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#B865FF',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }
        ).setOrigin(0.5).setVisible(false);

        // High score - fun style
        const highScore = localStorage.getItem('highScore') || 0;
        this.add.text(
            this.cameras.main.width - 15,
            55,
            'HI',
            {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#00E5FF',
                stroke: '#FFFFFF',
                strokeThickness: 2
            }
        ).setOrigin(1, 0);
        this.add.text(
            this.cameras.main.width - 15,
            72,
            `${highScore}`,
            {
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#00E5FF',
                stroke: '#FFFFFF',
                strokeThickness: 2
            }
        ).setOrigin(1, 0);

        // Menu button - fun style
        const menuButton = this.add.rectangle(
            this.cameras.main.width / 2,
            18,
            80,
            32,
            0xFFFFFF,
            1
        ).setOrigin(0.5, 0).setInteractive();
        menuButton.setStrokeStyle(3, 0xB865FF);

        const menuText = this.add.text(
            this.cameras.main.width / 2,
            34,
            'MENU',
            {
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#B865FF'
            }
        ).setOrigin(0.5);

        menuButton.on('pointerdown', (pointer) => {
            pointer.wasHandledByUI = true;
            this.showPauseMenu();
        });
        menuButton.on('pointerover', () => {
            menuButton.setFillStyle(0xB865FF);
            menuText.setFill('#FFFFFF');
            menuButton.setScale(1.05);
            menuText.setScale(1.05);
        });
        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0xFFFFFF);
            menuText.setFill('#B865FF');
            menuButton.setScale(1);
            menuText.setScale(1);
        });

        // Pause menu (hidden initially)
        this.pauseMenu = this.add.container(0, 0).setVisible(false).setDepth(1000);
        this.createPauseMenu();
    }

    createPauseMenu() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Bright overlay
        const overlay = this.add.rectangle(0, 0, width, height, 0xFFFFFF, 0.85).setOrigin(0, 0);
        this.pauseMenu.add(overlay);

        // Menu box with colorful border
        const menuBox = this.add.rectangle(width / 2, height / 2, 300, 380, 0xFFFFFF, 1);
        menuBox.setStrokeStyle(5, 0xFF69B4);
        this.pauseMenu.add(menuBox);

        // Title with fun style
        const title = this.add.text(width / 2, height / 2 - 140, 'PAUSED', {
            fontSize: '32px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);
        this.pauseMenu.add(title);

        // Resume button - bright green
        const resumeBtn = this.add.rectangle(width / 2, height / 2 - 50, 240, 50, 0x00FF88, 1).setInteractive();
        const resumeText = this.add.text(width / 2, height / 2 - 50, 'RESUME', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        this.pauseMenu.add([resumeBtn, resumeText]);

        resumeBtn.on('pointerdown', () => { soundManager.playButtonClick(); this.hidePauseMenu(); });
        resumeBtn.on('pointerover', () => {
            resumeBtn.setFillStyle(0x00E5FF);
            resumeBtn.setScale(1.05);
            resumeText.setScale(1.05);
        });
        resumeBtn.on('pointerout', () => {
            resumeBtn.setFillStyle(0x00FF88);
            resumeBtn.setScale(1);
            resumeText.setScale(1);
        });

        // Retry button - bright yellow
        const retryBtn = this.add.rectangle(width / 2, height / 2 + 20, 240, 50, 0xFFE135, 1).setInteractive();
        const retryText = this.add.text(width / 2, height / 2 + 20, 'RETRY', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        this.pauseMenu.add([retryBtn, retryText]);

        retryBtn.on('pointerdown', () => {
            soundManager.playButtonClick();
            soundManager.stopMusic();
            this.scene.restart();
        });
        retryBtn.on('pointerover', () => {
            retryBtn.setFillStyle(0xFF8C42);
            retryBtn.setScale(1.05);
            retryText.setScale(1.05);
        });
        retryBtn.on('pointerout', () => {
            retryBtn.setFillStyle(0xFFE135);
            retryBtn.setScale(1);
            retryText.setScale(1);
        });

        // Main Menu button - bright purple
        const mainMenuBtn = this.add.rectangle(width / 2, height / 2 + 90, 240, 50, 0xB865FF, 1).setInteractive();
        const mainMenuText = this.add.text(width / 2, height / 2 + 90, 'MAIN MENU', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        this.pauseMenu.add([mainMenuBtn, mainMenuText]);

        mainMenuBtn.on('pointerdown', () => {
            soundManager.playButtonClick();
            soundManager.stopMusic();
            this.scene.start('MenuScene');
        });
        mainMenuBtn.on('pointerover', () => {
            mainMenuBtn.setFillStyle(0xFF69B4);
            mainMenuBtn.setScale(1.05);
            mainMenuText.setScale(1.05);
        });
        mainMenuBtn.on('pointerout', () => {
            mainMenuBtn.setFillStyle(0xB865FF);
            mainMenuBtn.setScale(1);
            mainMenuText.setScale(1);
        });
    }

    showPauseMenu() {
        this.physics.pause();
        this.pauseMenu.setVisible(true);
        this.isPaused = true;
    }

    hidePauseMenu() {
        this.physics.resume();
        this.pauseMenu.setVisible(false);
        this.isPaused = false;
    }

    setupControls() {
        // Space bar to jump
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.isPaused) this.jump();
        });

        // Click/tap to jump (only if not on a UI element)
        this.input.on('pointerdown', (pointer) => {
            if (!this.isPaused && !pointer.wasHandledByUI) this.jump();
        });

        // ESC to toggle pause menu
        this.input.keyboard.on('keydown-ESC', () => {
            if (this.isPaused) {
                this.hidePauseMenu();
            } else {
                this.showPauseMenu();
            }
        });
    }

    jump() {
        // Only jump if on ground
        if (this.player.body.touching.down || this.player.y >= GameConfig.GROUND_Y - 50) {
            soundManager.playJump();
            this.player.setVelocityY(GameConfig.JUMP_VELOCITY);

            // Rotate during jump
            this.tweens.add({
                targets: this.player,
                angle: 15,
                duration: 200,
                yoyo: true
            });
        }
    }

    scheduleNextSpawn() {
        if (this.isGameOver) return;

        const delay = Phaser.Math.Between(
            GameConfig.MIN_SPAWN_INTERVAL,
            GameConfig.MAX_SPAWN_INTERVAL
        );

        this.time.delayedCall(delay, () => {
            if (this.isGameOver) return;
            this.spawnObject();
            this.scheduleNextSpawn();
        });
    }

    spawnObject() {
        const isObstacle = Math.random() < GameConfig.OBSTACLE_SPAWN_RATIO;

        if (isObstacle) {
            this.spawnObstacle();
        } else {
            this.spawnFood();
        }
    }

    spawnFood() {
        const foodIndex = Phaser.Math.Between(0, 11);
        const food = this.foodGroup.create(
            this.cameras.main.width + 50,
            Phaser.Math.Between(GameConfig.GROUND_Y - 180, GameConfig.GROUND_Y - 60),
            `food${foodIndex}`
        );

        food.setScale(1.0);
        food.body.setVelocityX(-this.gameSpeed);
        food.body.allowGravity = false;

        // Larger hitbox for easier collection
        food.body.setSize(
            food.width * 0.8,
            food.height * 0.8
        );

        // Assign point value (for MVP, random)
        food.pointValue = Phaser.Math.Between(3, 10);

        // Floating animation
        this.tweens.add({
            targets: food,
            y: food.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    spawnObstacle() {
        const obstacleType = Phaser.Math.Between(0, 1);
        let obstacle;

        if (obstacleType === 0) {
            // Ground spike - jumpable
            obstacle = this.obstacleGroup.create(
                this.cameras.main.width + 50,
                GameConfig.GROUND_Y - 25,
                'spike'
            );
            obstacle.setScale(0.5);

            // Smaller hitbox for ground obstacles
            obstacle.body.setSize(
                obstacle.width * 0.5,
                obstacle.height * 0.5
            );
        } else {
            // Flying bee - at jumpable height
            obstacle = this.obstacleGroup.create(
                this.cameras.main.width + 50,
                GameConfig.GROUND_Y - Phaser.Math.Between(130, 180),
                'bee1'
            );
            obstacle.setScale(0.5);

            // Smaller hitbox for bees
            obstacle.body.setSize(
                obstacle.width * 0.4,
                obstacle.height * 0.4
            );

            // Animate bee - reduced movement for predictability
            this.tweens.add({
                targets: obstacle,
                y: obstacle.y + 10,
                duration: 600,
                yoyo: true,
                repeat: -1
            });
        }

        obstacle.body.setVelocityX(-this.gameSpeed);
        obstacle.body.allowGravity = false;
    }

    collectFood(player, food) {
        soundManager.playCollect();

        // Add points with combo multiplier
        const points = food.pointValue * this.combo;
        this.score += points;
        this.scoreValue.setText(`${this.score}`);

        // Increase combo
        if (this.combo < GameConfig.MAX_COMBO) {
            this.combo++;
        }
        this.lastComboTime = this.time.now;

        // Show combo text with bright fun colors
        if (this.combo > 1) {
            this.comboText.setText(`x${this.combo} COMBO!`);
            this.comboText.setVisible(true);

            // Bright color based on combo level
            const colors = ['#FFE135', '#00E5FF', '#FF69B4', '#00FF88', '#B865FF'];
            const color = colors[this.combo - 2] || colors[4];
            this.comboText.setFill(color);
            this.comboText.setStroke('#FFFFFF', 4);
            soundManager.playCombo();

            // Fun bounce animation
            this.tweens.add({
                targets: this.comboText,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 150,
                yoyo: true,
                ease: 'Back.easeOut'
            });
        }

        // Particle effect (simple scale animation)
        this.tweens.add({
            targets: food,
            scale: 1.5,
            alpha: 0,
            duration: 200,
            onComplete: () => food.destroy()
        });
    }

    hitObstacle(player, obstacle) {
        if (this.isInvincible) return;
        soundManager.playHit();

        // Lose a life
        this.lives--;
        this.updateLivesDisplay();

        // Reset combo
        this.combo = 1;
        this.comboText.setVisible(false);

        // Destroy obstacle
        obstacle.destroy();

        // Glitch effect via HTML
        if (window.addGlitchEffect) window.addGlitchEffect();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Make player invincible temporarily
            this.isInvincible = true;

            // Flash effect
            this.tweens.add({
                targets: this.player,
                alpha: 0.3,
                duration: GameConfig.FLASH_INTERVAL,
                yoyo: true,
                repeat: GameConfig.INVINCIBILITY_DURATION / GameConfig.FLASH_INTERVAL / 2
            });

            this.time.delayedCall(GameConfig.INVINCIBILITY_DURATION, () => {
                this.isInvincible = false;
                this.player.alpha = 1;
            });

            // Screen shake
            this.cameras.main.shake(200, 0.005);
        }
    }

    updateLivesDisplay() {
        const hearts = '❤️'.repeat(this.lives);
        const emptyHearts = '🖤'.repeat(GameConfig.STARTING_LIVES - this.lives);
        this.livesText.setText(hearts + emptyHearts);
    }

    increaseDifficulty() {
        if (this.gameSpeed < GameConfig.MAX_SPEED) {
            this.gameSpeed += GameConfig.SPEED_INCREASE_AMOUNT;

            // Update velocity of existing objects to match new speed
            this.foodGroup.getChildren().forEach(food => {
                food.body.setVelocityX(-this.gameSpeed);
            });
            this.obstacleGroup.getChildren().forEach(obstacle => {
                obstacle.body.setVelocityX(-this.gameSpeed);
            });
        }
    }

    gameOver() {
        this.isGameOver = true;
        soundManager.stopMusic();
        soundManager.playGameOver();

        // Save high score
        const highScore = localStorage.getItem('highScore') || 0;
        if (this.score > highScore) {
            localStorage.setItem('highScore', this.score);
        }

        // Go to game over scene
        this.scene.start('GameOverScene', {
            score: this.score,
            character: this.selectedCharacter,
            characterName: this.characterName
        });
    }

    update() {
        if (this.isPaused) return;

        // Parallax scrolling - different speeds for depth effect
        this.cloudTiles.tilePositionX += this.gameSpeed / 200; // Slowest (clouds far away)
        this.parkTiles.tilePositionX += this.gameSpeed / 120;  // Medium speed (trees/hills)
        this.dirtTiles.tilePositionX += this.gameSpeed / 60;   // Dirt path (same speed as ground)
        this.groundTiles.tilePositionX += this.gameSpeed / 60; // Fastest (ground close to player)

        // Scroll grass decorations (iterate backwards for safe removal)
        const grassChildren = this.grassGroup.getChildren();
        for (let i = grassChildren.length - 1; i >= 0; i--) {
            const grass = grassChildren[i];
            grass.x -= this.gameSpeed / 60;
            if (grass.x < -50) {
                grass.destroy();
            }
        }

        // Spawn new grass periodically
        if (this.time.now - this.lastGrassSpawn > 400) {
            if (Math.random() < 0.7) { // 70% chance to spawn
                this.spawnGrassTuft(this.cameras.main.width + 50);
            }
            this.lastGrassSpawn = this.time.now;
        }

        // Keep player on ground when not jumping
        if (this.player.y >= GameConfig.GROUND_Y - 50 && this.player.body.velocity.y > 0) {
            this.player.y = GameConfig.GROUND_Y - 50;
            this.player.setVelocityY(0);
        }

        // Check combo timeout (replaces separate 100ms timer)
        if (this.combo > 1 && this.time.now - this.lastComboTime > GameConfig.COMBO_TIMEOUT) {
            this.combo = 1;
            this.comboText.setVisible(false);
        }

        // Clean up off-screen objects (iterate backwards for safe removal)
        const foods = this.foodGroup.getChildren();
        for (let i = foods.length - 1; i >= 0; i--) {
            if (foods[i].x < -50) foods[i].destroy();
        }

        const obstacles = this.obstacleGroup.getChildren();
        for (let i = obstacles.length - 1; i >= 0; i--) {
            if (obstacles[i].x < -50) obstacles[i].destroy();
        }
    }
}
