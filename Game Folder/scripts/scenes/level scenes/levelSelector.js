class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: 'levelSelector' });
    }

    create() {
        // Button Setup
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
        this.menuOpacity = this.add.image(0, 0, 'menuOpacity').setOrigin(0, 0).setAlpha(0.5);

        setupButton(this.add.image(this.scale.width / 4, 350, 'levelOneCG'), 0.4, 'levelOne');

        setupButton(this.add.image(this.scale.width / 2, 350, 'levelTwoCG'), 0.4, 'levelTwo');
    
        setupButton(this.add.image(this.scale.width / 1.35, 350, 'levelThreeCG'), 0.4, 'levelThree');

        const exitBtn = this.add.image(900, 630, 'exitBtn');
        setupButton(exitBtn, 0.11, 'mainMenu');


    }

    update() {
    }
}








