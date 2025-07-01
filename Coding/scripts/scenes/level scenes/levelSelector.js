class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: 'levelSelector' });
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

        setupButton(this.add.image(this.scale.width / 5, 275, 'startBtn'), 0.092, 'levelOne');
    

        setupButton(this.add.image(550, 300, 'statsBtn'), 0.092, 'levelTwo');
    
        setupButton(this.add.image(830, 300, 'creditBtn'), 0.37, 'levelThree');

        const exitBtn = this.add.image(900, 630, 'exitBtn');
        setupButton(exitBtn, 0.11, 'mainMenu');


    }

    update() {
        // Optional scrolling background
        // this.menuBackground.tilePositionY -= 0.2;
    }
}








