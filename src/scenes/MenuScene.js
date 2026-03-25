class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.selectedCharacter = 'dog';
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Bright gradient background
        this.add.rectangle(0, 0, width, height, 0xFFE5F1).setOrigin(0, 0);

        // Add subtle park background
        this.add.tileSprite(0, 0, width * 2, 300, 'clouds').setOrigin(0, 0).setScale(1).setAlpha(0.3);
        this.add.tileSprite(0, height - 350, width * 2, 256, 'park').setOrigin(0, 0).setScale(1.4).setAlpha(0.4);
        this.add.tileSprite(0, height - 160, width * 2, 140, 'dirt').setOrigin(0, 0).setAlpha(0.3);
        this.add.tileSprite(0, height - 120, width * 2, 120, 'ground').setOrigin(0, 0).setAlpha(0.4);

        // Fun colorful title
        const title1 = this.add.text(width / 2, 70, "VELMA & NEGRO'S", {
            fontSize: '20px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 4
        }).setOrigin(0.5);

        const title2 = this.add.text(width / 2, 100, 'ADVENTURES', {
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#00E5FF',
            stroke: '#FFFFFF',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Bounce animation
        this.tweens.add({
            targets: title1,
            y: 67,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.tweens.add({
            targets: title2,
            y: 103,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Instructions
        this.add.text(width / 2, 140, 'Choose Your Friend!', {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#B865FF'
        }).setOrigin(0.5);

        // Character selection SIDE BY SIDE - Better spacing
        const charY = height / 2 - 10;
        const leftX = width / 2 - 115;
        const rightX = width / 2 + 115;

        // Velma (Dog) - LEFT SIDE
        const velmaBorder = this.add.circle(leftX, charY, 45);
        velmaBorder.setStrokeStyle(4, 0xFF69B4, 1);
        velmaBorder.isFilled = false;

        const velmaSprite = this.add.image(leftX, charY, 'dog').setScale(0.28).setInteractive();

        const velmaText = this.add.text(leftX, charY + 60, 'VELMA', {
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#FF69B4',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Negro (Cat) - RIGHT SIDE
        const negroCircle = this.add.circle(rightX, charY, 45, 0xE0F4FF, 1);
        const negroBorder = this.add.circle(rightX, charY, 45);
        negroBorder.setStrokeStyle(3, 0x999999, 1);
        negroBorder.isFilled = false;

        const negroSprite = this.add.image(rightX, charY, 'cat').setScale(0.28).setInteractive();

        const negroText = this.add.text(rightX, charY + 60, 'NEGRO', {
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#999999',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Selection logic
        velmaSprite.on('pointerdown', () => {
            this.selectedCharacter = 'dog';
            velmaBorder.setStrokeStyle(5, 0xFF69B4, 1);
            velmaText.setFill('#FF69B4');
            negroBorder.setStrokeStyle(4, 0x999999, 1);
            negroText.setFill('#999999');

            // Bounce effect
            this.tweens.add({
                targets: velmaSprite,
                scaleX: 0.33,
                scaleY: 0.33,
                duration: 100,
                yoyo: true
            });
        });

        negroSprite.on('pointerdown', () => {
            this.selectedCharacter = 'cat';
            negroBorder.setStrokeStyle(5, 0x00E5FF, 1);
            negroText.setFill('#00E5FF');
            velmaBorder.setStrokeStyle(4, 0xFF69B4, 1);
            velmaText.setFill('#999999');

            // Bounce effect
            this.tweens.add({
                targets: negroSprite,
                scaleX: 0.33,
                scaleY: 0.33,
                duration: 100,
                yoyo: true
            });
        });

        // Hover effects
        velmaSprite.on('pointerover', () => velmaSprite.setScale(0.32));
        velmaSprite.on('pointerout', () => velmaSprite.setScale(0.28));
        negroSprite.on('pointerover', () => negroSprite.setScale(0.32));
        negroSprite.on('pointerout', () => negroSprite.setScale(0.28));

        // Start with Velma selected by default
        velmaBorder.setStrokeStyle(5, 0xFF69B4, 1);
        velmaText.setFill('#FF69B4');

        // START BUTTON
        const startY = height - 120;

        const startButton = this.add.rectangle(width / 2, startY, 200, 55, 0xFFFFFF, 1);
        startButton.setStrokeStyle(4, 0x00FF88, 1);
        startButton.setInteractive();

        const startText = this.add.text(width / 2, startY, 'START!', {
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#00FF88'
        }).setOrigin(0.5);

        // Pulse animation
        this.tweens.add({
            targets: startButton,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x00FF88);
            startText.setFill('#FFFFFF');
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0xFFFFFF);
            startText.setFill('#00FF88');
        });

        startButton.on('pointerdown', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene', { character: this.selectedCharacter });
            });
        });

        // High score
        const highScore = localStorage.getItem('highScore') || 0;
        this.add.text(width / 2, height - 55, `★ High Score: ${highScore} ★`, {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#B865FF'
        }).setOrigin(0.5);

        // Keyboard shortcut
        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.flash(300, 255, 255, 255);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene', { character: this.selectedCharacter });
            });
        });

        // Decorative stars
        const stars = ['★', '★', '★', '★'];
        const positions = [
            {x: 20, y: 20},
            {x: width - 20, y: 20},
            {x: 20, y: height - 20},
            {x: width - 20, y: height - 20}
        ];

        const colors = ['#FF69B4', '#00E5FF', '#FFE135', '#B865FF'];

        positions.forEach((pos, i) => {
            const star = this.add.text(pos.x, pos.y, stars[i], {
                fontSize: '20px',
                fill: colors[i]
            }).setOrigin(0.5);

            this.tweens.add({
                targets: star,
                angle: 360,
                scale: 1.3,
                duration: 3000 + i * 500,
                yoyo: true,
                repeat: -1
            });
        });
    }
}
