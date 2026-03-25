class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.character = data.character || 'dog';
        this.characterName = data.characterName || 'Velma';
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Bright gradient background
        this.add.rectangle(0, 0, width, height, 0xFFE5F1).setOrigin(0, 0);

        // Flash effect
        this.cameras.main.flash(400, 255, 255, 255);

        // GAME OVER text with fun style
        const gameOverText = this.add.text(width / 2, 90, 'GAME', {
            fontSize: '36px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 5
        }).setOrigin(0.5);

        const overText = this.add.text(width / 2, 130, 'OVER!', {
            fontSize: '36px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#00E5FF',
            stroke: '#FFFFFF',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Bounce animation
        this.tweens.add({
            targets: [gameOverText, overText],
            y: '+=5',
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Character name with star
        this.add.text(width / 2, 185, `★ ${this.characterName} ★`, {
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#B865FF',
            stroke: '#FFFFFF',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Score label
        this.add.text(width / 2, 225, 'Final Score', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF8C42'
        }).setOrigin(0.5);

        // Final score - BIG and colorful
        const scoreDisplay = this.add.text(width / 2, 275, this.finalScore.toString(), {
            fontSize: '52px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFE135',
            stroke: '#FFFFFF',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Animate score counting up
        let displayScore = 0;
        const scoreInterval = setInterval(() => {
            if (displayScore < this.finalScore) {
                displayScore += Math.ceil(this.finalScore / 30);
                if (displayScore > this.finalScore) displayScore = this.finalScore;
                scoreDisplay.setText(displayScore.toString());
            } else {
                clearInterval(scoreInterval);
            }
        }, 30);

        // High score comparison
        const highScore = localStorage.getItem('highScore') || 0;
        const isNewHighScore = this.finalScore >= highScore;

        if (isNewHighScore && this.finalScore > 0) {
            const newHighText = this.add.text(width / 2, 350, '🎉 NEW HIGH SCORE! 🎉', {
                fontSize: '18px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#FF69B4',
                stroke: '#FFFFFF',
                strokeThickness: 3
            }).setOrigin(0.5);

            // Celebration animation
            this.tweens.add({
                targets: newHighText,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Create confetti effect
            this.createConfetti();
        } else {
            this.add.text(width / 2, 350, `High Score: ${highScore}`, {
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                fill: '#B865FF'
            }).setOrigin(0.5);
        }

        // Play Again button - bright green
        const playAgainBtn = this.add.rectangle(width / 2, height - 140, 220, 55, 0x00FF88, 1);
        playAgainBtn.setInteractive();

        const playAgainText = this.add.text(width / 2, height - 140, 'PLAY AGAIN!', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Pulsing effect
        this.tweens.add({
            targets: playAgainBtn,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        playAgainBtn.on('pointerover', () => {
            playAgainBtn.setFillStyle(0x00E5FF);
            playAgainBtn.setScale(1.1);
            playAgainText.setScale(1.1);
        });

        playAgainBtn.on('pointerout', () => {
            playAgainBtn.setFillStyle(0x00FF88);
            playAgainBtn.setScale(1);
            playAgainText.setScale(1);
        });

        playAgainBtn.on('pointerdown', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene', { character: this.character });
            });
        });

        // Main Menu button - bright purple
        const menuBtn = this.add.rectangle(width / 2, height - 70, 220, 55, 0xB865FF, 1);
        menuBtn.setInteractive();

        const menuText = this.add.text(width / 2, height - 70, 'MAIN MENU', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        menuBtn.on('pointerover', () => {
            menuBtn.setFillStyle(0xFF69B4);
            menuBtn.setScale(1.05);
            menuText.setScale(1.05);
        });

        menuBtn.on('pointerout', () => {
            menuBtn.setFillStyle(0xB865FF);
            menuBtn.setScale(1);
            menuText.setScale(1);
        });

        menuBtn.on('pointerdown', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('MenuScene');
            });
        });

        // Keyboard shortcuts
        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene', { character: this.character });
            });
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('MenuScene');
            });
        });

        // Decorative stars in corners
        const stars = ['★', '✨', '💫', '⭐'];
        const positions = [
            {x: 20, y: 20},
            {x: width - 20, y: 20},
            {x: 20, y: height - 20},
            {x: width - 20, y: height - 20}
        ];

        positions.forEach((pos, i) => {
            const star = this.add.text(pos.x, pos.y, stars[i], {
                fontSize: '24px'
            }).setOrigin(0.5);

            this.tweens.add({
                targets: star,
                angle: 360,
                scale: 1.5,
                duration: 3000 + i * 500,
                yoyo: true,
                repeat: -1
            });
        });
    }

    createConfetti() {
        const colors = [0xFF69B4, 0x00E5FF, 0xFFE135, 0xB865FF, 0x00FF88];

        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            const y = -50;
            const color = Phaser.Math.RND.pick(colors);

            const confetti = this.add.rectangle(x, y, 8, 8, color);

            this.tweens.add({
                targets: confetti,
                y: this.cameras.main.height + 50,
                x: x + Phaser.Math.Between(-100, 100),
                angle: 360 * 3,
                duration: Phaser.Math.Between(2000, 4000),
                delay: i * 50,
                onComplete: () => confetti.destroy()
            });
        }
    }
}
