class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
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

        this.menuBackground = this.add.image(0, 0, 'menuBg1').setScale(0.92).setOrigin(0, 0);
        this.menuTitle = this.add.image(this.scale.width / 3.15, 125, 'gameTitle').setScale(0.72);

        setupButton(this.add.image(this.scale.width / 5, 275, 'startBtn'), 0.092, 'levelSelector');

        setupButton(this.add.image(190, 405, 'statsBtn'), 0.092, 'statsScene');

        setupButton(this.add.image(230, 533, 'creditBtn'), 0.37, 'creditsScene');

        setupButton(this.add.image(845, 630, 'settingsBtn'), 0.09, 'settingsScene');

        const exitBtn = this.add.image(900, 630, 'exitBtn');
        setupButton(exitBtn, 0.11, null);

        exitBtn.on('pointerdown', () => {
            this.sound.play('clickSFX', { volume: 0.5 });
            music.stop();
            alert('You have quit the game.');

            this.time.delayedCall(150, () => {
                this.add.rectangle(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    this.scale.width,
                    this.scale.height,
                    0x000000,
                    0.8
                ).setOrigin(0.5);

                this.add.text(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    'Game Quit',
                    {
                        fontSize: '48px',
                        fill: '#ffffff',
                        fontFamily: 'Agency FB'
                    }
                ).setOrigin(0.5);

                this.sys.game.loop.stop();
            });
        });

        let music = this.registry.get('currentMusic');
        if (!music || !music.isPlaying || music.key !== 'menuMusic') {
            if (music && music.isPlaying) {
                music.stop();
            }

            music = this.sound.add('menuMusic', { loop: true, volume: 0.3 });
            music.play();
            this.registry.set('currentMusic', music);
        }
    }

    update() {
        // Optional scrolling background
        // this.menuBackground.tilePositionY -= 0.2;
    }
}
