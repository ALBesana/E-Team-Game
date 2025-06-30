class settingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'settingsScene' });
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
        this.menuOpacity = this.add.image(0, 0, 'menuOpacity').setOrigin(0, 0).setAlpha(0.5);

        setupButton(this.add.image(900, 630, 'exitBtn'), 0.11, 'mainMenu');
        // this.backHolder.on('pointerdown', () => {
        //     this.sound.play('clickSFX', {volume: 0.5});

        //     this.time.delayedCall(150, () => {
        //         this.scene.start('mainMenu');
        //     });
        // });
    }

    update() {
        // this.gameBackground.tilePositionY -= 0.3;
    }
}