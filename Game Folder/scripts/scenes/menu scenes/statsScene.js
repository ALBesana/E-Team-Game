class statsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'statsScene' });
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

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const creditStyle = {
            fontFamily: 'Agency FB',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        };

        this.add.text(centerX, centerY, '[ Currently in Development ]', creditStyle).setOrigin(0.5);

        setupButton(this.add.image(900, 630, 'exitBtn'), 0.11, 'mainMenu');
    }

    update() {
    }
}