class levelTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'levelTwo' });
    }

    create() {
        // Background
        this.gameBackground = this.add.tileSprite(0, 0, 5000, this.scale.height, 'levelOneBG').setOrigin(0, 0);

        // Exit button
        this.backHolder = this.add.image(this.scale.width / 1.025, 620, 'exitBtn')
            .setScrollFactor(0)
            .setScale(0.08)
            .setInteractive();
        this.backHolder.on('pointerdown', () => {
            this.time.delayedCall(150, () => {
                this.scene.start('mainMenu');
            });
        });

        // Platforms with gaps
        this.platforms = this.physics.add.staticGroup();

        const ground1 = this.add.tileSprite(100, 590, 1000, 120, 'ground');
        this.physics.add.existing(ground1, true);
        this.platforms.add(ground1);

        const ground2 = this.add.tileSprite(1000, 590, 400, 120, 'ground');
        this.physics.add.existing(ground2, true);
        this.platforms.add(ground2);

        const ground3 = this.add.tileSprite(1820, 590, 800, 120, 'ground');
        this.physics.add.existing(ground3, true);
        this.platforms.add(ground3);

        const ground4 = this.add.tileSprite(2700, 590, 600, 120, 'ground');
        this.physics.add.existing(ground4, true);
        this.platforms.add(ground4);

        const ground5 = this.add.tileSprite(4130, 590, 1800, 120, 'ground');
        this.physics.add.existing(ground5, true);
        this.platforms.add(ground5);

        const obstacle1 = this.add.tileSprite(4130, 510, 310, 120, 'ground');
        this.physics.add.existing(obstacle1, true);
        this.platforms.add(obstacle1);

        // Player
        this.player = this.physics.add.sprite(100, 500, 'character')
            .setCollideWorldBounds(true)
            .setScale(1.2);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 5000, this.scale.height);
        this.physics.world.setBounds(0, 0, 5000, this.scale.height);

        // Collisions
        this.physics.add.collider(this.player, this.platforms);

        // Invisible kill zone at the bottom
        this.deathZone = this.add.rectangle(2500, this.scale.height + 10, 5000, 30, 0xff0000, 0); // Invisible
        this.physics.add.existing(this.deathZone, true);
        this.physics.add.overlap(this.player, this.deathZone, this.onPlayerDeath, null, this);

        // Controls
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Bring UI on top
        this.children.bringToTop(this.backHolder);

        // Game Over flag
        this.isGameOver = false;
    }

    onPlayerDeath() {
        this.backHolder.setVisible(false).disableInteractive();
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.player.setVelocity(0, 0);
        this.player.setVisible(false);

        const overlay = this.add.rectangle(
            this.cameras.main.scrollX + this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.6
        );

        // === YOU DIED! ===
        const gameOverText = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 200, 'YOU DIED!', {
            fontFamily: 'Agency FB',
            fontSize: '64px',
            color: '#ff0000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(1);

        const gameOverBG = this.add.graphics().setDepth(0);
        gameOverBG.fillStyle(0x5e0404, 1);
        gameOverBG.fillRoundedRect(
        gameOverText.getBounds().x,
        gameOverText.getBounds().y,
        gameOverText.width,
        gameOverText.height,
        20
        );

        // === RETRY BUTTON ===
        const retryButton = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 300, 'Retry', {
            fontFamily: 'Agency FB',
            fontSize: '28px',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive().setDepth(1);

        const retryBG = this.add.graphics().setDepth(0);
        retryBG.fillStyle(0x00118c, 1);
        retryBG.fillRoundedRect(
        retryButton.getBounds().x,
        retryButton.getBounds().y,
        retryButton.width,
        retryButton.height,
        15
        );

        retryButton.on('pointerdown', () => {
            his.scene.start('levelTwo');
        });

        // === MAIN MENU BUTTON ===
        const mainMenuButton = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 365, 'Return to Main Menu', {
            fontFamily: 'Agency FB',
            fontSize: '28px',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive().setDepth(1);

        const menuBG = this.add.graphics().setDepth(0);
        menuBG.fillStyle(0xa10000, 1);
        menuBG.fillRoundedRect(
        mainMenuButton.getBounds().x,
        mainMenuButton.getBounds().y,
        mainMenuButton.width,
        mainMenuButton.height,
        15
        );

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('mainMenu');
        });

    }
    update() {
        if (this.isGameOver) return;

        this.gameBackground.tilePositionY -= 0.3;

        const speed = 1000;
        this.player.setVelocityX(0);

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.keys.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-400);
        }
    }
}
