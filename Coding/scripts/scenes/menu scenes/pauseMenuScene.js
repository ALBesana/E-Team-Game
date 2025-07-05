class pauseMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseMenuScene' });
    }

    create(data) {
        this.returnSceneKey = data.returnTo || 'levelOne';

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.pauseMenuScene = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.6).setOrigin(0);

        this.pausedTitle = this.add.image(centerX, centerY, 'gamePaused').setOrigin(0.5);

        this.continueBtn = this.setupButton(this.add.image(centerX - 125, centerY + 20, 'gameContinue'), 0.3, null);
        this.settingsBtn = this.setupButton(this.add.image(centerX, centerY + 20, 'gameSettings'), 0.25, null);
        this.settingsBtn.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('gameSettingsScene', { returnTo: 'pauseMenuScene', returnSceneKey: this.returnSceneKey });
        });
        this.mainMenuBtn = this.setupButton(this.add.image(centerX + 125, centerY + 20, 'mainMenu'), 0.25, 'mainMenu');

        this.continueBtn.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume(this.returnSceneKey);
        });
    }

    // Pause, unpause, and change scene buttons
    setupButton(button, originalScale, targetScene) {
        button.setScale(originalScale).setInteractive();

        button.on('pointerover', () => button.setScale(originalScale * 1.1));
        button.on('pointerout', () => {
            button.setScale(originalScale);
            button.clearTint();
        });

        button.on('pointerdown', () => {
            button.setTint(0x999999);
            this.sound.play('clickSFX', { volume: 0.5 });

            this.time.delayedCall(150, () => {
                if (targetScene) {
                    this.scene.stop(this.returnSceneKey);
                    this.scene.stop();
                    this.scene.start(targetScene);
                }
            });
        });

        button.on('pointerup', () => button.clearTint());
    return button;
    }
}
