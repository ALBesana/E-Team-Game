class levelTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'levelTwo' });
    }

    create() {
        // Background
        this.gameBackground = this.add.tileSprite(0, 0, 10000, this.scale.height, 'levelOneBG').setOrigin(0, 0);

        // Reusable button setup
        const setupButton = (button, originalScale, targetScene) => {
            button.setScale(originalScale).setInteractive();

            button.on('pointerover', () => {
                button.setScale(originalScale * 1.1);
            });

            button.on('pointerout', () => {
                button.setScale(originalScale);
                button.clearTint();
            });

            button.on('pointerdown', () => {
                button.setTint(0x999999);
                this.sound.play('clickSFX', { volume: 0.5 });

                this.time.delayedCall(150, () => {
                    if (targetScene) this.scene.start(targetScene);
                });
            });

            button.on('pointerup', () => {
                button.clearTint();
            });
        };

        // Exit Button (hover/click fx)
        this.backHolder = this.add.image(this.scale.width / 1.025, 620, 'exitBtn').setScrollFactor(0);
        setupButton(this.backHolder, 0.08, 'mainMenu');

        // Platforms with gaps
        this.platforms = this.physics.add.staticGroup();

        const groundSpecs = [
            [100, 610, 1000], [1150, 610, 400], [1600, 610, 800], [2500, 610, 600],
            [3200, 610, 1000], [4300, 610, 600], [5100, 610, 700], [6000, 610, 500],
            [6700, 610, 1200], [8100, 610, 400], [8600, 610, 600], [9300, 610, 800],
            [10200, 610, 400]
        ];

        groundSpecs.forEach(([x, y, width]) => {
            const ground = this.add.tileSprite(x, y, width, 120, 'ground');
            this.physics.add.existing(ground, true);
            this.platforms.add(ground);
        });

        const obstacle1 = this.add.tileSprite(4130, 530, 310, 120, 'ground');
        this.physics.add.existing(obstacle1, true);
        this.platforms.add(obstacle1);

        // Player
        this.player = this.physics.add.sprite(100, 500, 'character')
            .setCollideWorldBounds(true)
            .setScale(1.2);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 10000, this.scale.height);
        this.physics.world.setBounds(0, 0, 10000, this.scale.height);

        // Collisions
        this.physics.add.collider(this.player, this.platforms);

        // Extended Kill Zone (death area)
        this.deathZone = this.add.rectangle(5000, this.scale.height + 10, 10000, 30, 0xff0000, 0);
        this.physics.add.existing(this.deathZone, true);
        this.physics.add.overlap(this.player, this.deathZone, this.onPlayerDeath, null, this);

        // Controls
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.children.bringToTop(this.backHolder);

        this.isGameOver = false;
    }

    onPlayerDeath() {
        this.backHolder.setVisible(false).disableInteractive();
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.sound.play('death_sound', { volume: 0.5 });

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
            this.scene.start('levelTwo');
        });

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
