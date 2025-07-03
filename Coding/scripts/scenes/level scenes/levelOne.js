class levelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'levelOne' });
    }

    create() {
        // Background
        this.gameBackground = this.add.tileSprite(0, 0, 5000, this.scale.height, 'levelOneBG').setOrigin(0, 0);

        // Button setup function
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

            return button;  
        };

        const retryBtnImage = this.add.image(this.scale.width - 80, 40, 'gameRetry');
        this.retryBtn = setupButton(retryBtnImage, 0.07, null);
        this.retryBtn.setScrollFactor(0);
        this.retryBtn.on('pointerdown', () => {
            this.scene.restart();
        });

        const pauseBtnImage = this.add.image(this.scale.width - 40, 40, 'gamePause');
        this.pauseBtn = setupButton(pauseBtnImage, 0.07, null);
        this.pauseBtn.setScrollFactor(0);
        this.pauseBtn.on('pointerdown', () => {
            this.pauseGame();
        });

        // Platforms with gaps
        this.platforms = this.physics.add.staticGroup();

        const groundSpecs = [
            [100, 610, 1000],
            [1000, 610, 400],
            [1820, 610, 800],
            [2700, 610, 600],
            [4130, 610, 1800]
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
        this.cameras.main.setBounds(0, 0, 5000, this.scale.height);
        this.physics.world.setBounds(0, 0, 5000, this.scale.height);

        // Collisions
        this.physics.add.collider(this.player, this.platforms);

        // Kill zone
        this.deathZone = this.add.rectangle(2500, this.scale.height + 10, 5000, 30, 0xff0000, 0);
        this.physics.add.existing(this.deathZone, true);
        this.physics.add.overlap(this.player, this.deathZone, this.onPlayerDeath, null, this);

        // Win object
        this.winObject = this.physics.add.sprite(4964.13, 530, 'object').setImmovable(true).setScale(1);
        this.winObject.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.winObject, this.onPlayerWin, null, this);

        // Controls
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.isGameOver = false;

        let currentMusic = this.registry.get('currentMusic');
        if (currentMusic && currentMusic.isPlaying && currentMusic.key !== 'gameMusic') {
            currentMusic.stop();
        }

        if (!currentMusic || currentMusic.key !== 'gameMusic') {
            currentMusic = this.sound.add('gameMusic', { loop: true, volume: 0.3 });
            currentMusic.play();
            this.registry.set('currentMusic', currentMusic);
        } else if (!currentMusic.isPlaying) {
            currentMusic.play();
        }
    }

    onPlayerDeath() {
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
            this.scene.start('levelOne');
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

    onPlayerWin() {
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.sound.play('win_sound', { volume: 0.5 });
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

        const winText = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 200, 'YOU WON!', {
            fontFamily: 'Agency FB',
            fontSize: '64px',
            color: '#00ff00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(1);

        const winBG = this.add.graphics().setDepth(0);
        winBG.fillStyle(0x044b05, 1);
        winBG.fillRoundedRect(
            winText.getBounds().x,
            winText.getBounds().y,
            winText.width,
            winText.height,
            20
        );

        const nextLevelButton = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 300, 'Next Level', {
            fontFamily: 'Agency FB',
            fontSize: '28px',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive().setDepth(1);

        const nextBG = this.add.graphics().setDepth(0);
        nextBG.fillStyle(0x004dff, 1);
        nextBG.fillRoundedRect(
            nextLevelButton.getBounds().x,
            nextLevelButton.getBounds().y,
            nextLevelButton.width,
            nextLevelButton.height,
            15
        );

        nextLevelButton.on('pointerdown', () => {
            this.scene.start('levelTwo');
        });

        const menuButton = this.add.text(this.cameras.main.scrollX + this.scale.width / 2, 365, 'Return to Main Menu', {
            fontFamily: 'Agency FB',
            fontSize: '28px',
            color: '#ffffff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive().setDepth(1);

        const menuBG = this.add.graphics().setDepth(0);
        menuBG.fillStyle(0xa10000, 1);
        menuBG.fillRoundedRect(
            menuButton.getBounds().x,
            menuButton.getBounds().y,
            menuButton.width,
            menuButton.height,
            15
        );

        menuButton.on('pointerdown', () => {
            this.scene.start('mainMenu');
        });
    }

    pauseGame() {
        this.scene.launch('pauseMenuScene', { returnTo: this.scene.key });
        this.scene.pause();
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

        if (this.keys.up.isDown && this.player.body.blocked.down && !this.justJumped) {
            this.player.setVelocityY(-400);
            this.sound.play('jump_sound', { volume: 0.4 });
            this.justJumped = true;
        }

        if (!this.keys.up.isDown || !this.player.body.blocked.down) {
            this.justJumped = false;
        }
    }
}
