class creditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' });
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

        // Developer credits 
        const centerX = this.cameras.main.centerX;
        const baseY = 200;

        const creditStyle = {
            fontFamily: 'Agency FB',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        };

        this.add.text(centerX, baseY, 'E-Team Game Developers of A224', {
            fontFamily: 'Agency FB',
            fontSize: '48px',
            color: '#00ffcc',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, baseY + 60, 'A.L. Schatz A. Besana - Project Lead', creditStyle).setOrigin(0.5);
        this.add.text(centerX, baseY + 110, 'Favio Maximo G. Alfonso - Asset Developer', creditStyle).setOrigin(0.5);
        this.add.text(centerX, baseY + 160, 'Amiel Ed Angelo A. Faller - Lead Developer', creditStyle).setOrigin(0.5);
        this.add.text(centerX, baseY + 210, 'Alvaro Maldonado - Co-Lead Developer', creditStyle).setOrigin(0.5);

        setupButton(this.add.image(900, 630, 'exitBtn'), 0.11, 'mainMenu');
    }

    update() {

    }
}