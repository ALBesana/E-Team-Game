class gameSettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameSettingsScene' });
    }

    create(data) {
        this.returnTo = data.returnTo || 'pauseMenuScene';
        this.originalLevel = data.returnSceneKey || 'levelOne';

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Background image based on design
        this.menuBackground = this.add.image(0, 0, 'menuBg1').setScale(0.92).setOrigin(0, 0);
        this.menuOpacity = this.add.image(0, 0, 'menuOpacity').setOrigin(0, 0).setAlpha(0.5);
        this.add.image(centerX, centerY, 'gameSettingsBg').setOrigin(0.5).setScale(1.2);

        // Reusable button setup function
        const setupButton = (button, originalScale, targetScene) => {
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
                    if (targetScene) this.scene.start(targetScene);
                });
            });

            button.on('pointerup', () => button.clearTint());
            return button;
        };

        // SOUND TOGGLE BUTTON (custom logic, not using setupButton)
        this.isSoundOn = !this.sound.mute;
        this.soundBtn = this.add.image(centerX - 60, centerY - 23, this.isSoundOn ? 'soundOnBtn' : 'soundOffBtn')
            .setInteractive()
            .setScale(0.12);

        this.soundBtn.on('pointerdown', () => {
            this.isSoundOn = !this.isSoundOn;
            this.sound.mute = !this.isSoundOn;
            this.soundBtn.setTexture(this.isSoundOn ? 'soundOnBtn' : 'soundOffBtn');
            this.sound.play('clickSFX', { volume: 0.5 });
            this.registry.set('isSoundMuted', this.sound.mute);
        });

        // WINDOWED BUTTON
        this.windowedBtn = this.add.image(centerX - 100, centerY + 115, 'windowedBtn');
        setupButton(this.windowedBtn, 0.4, null);
        this.windowedBtn.on('pointerdown', () => {
            this.scale.stopFullscreen();
            this.sound.play('clickSFX', { volume: 0.5 });
        });

        // FULLSCREEN BUTTON
        this.fullscreenBtn = this.add.image(centerX - 100, centerY + 215, 'fullscreenBtn');
        setupButton(this.fullscreenBtn, 0.4, null);
        this.fullscreenBtn.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.sound.play('clickSFX', { volume: 0.5 });
        });

        // BACK BUTTON
        this.backBtn = this.add.image(centerX + 230, centerY + 250, 'backBtn');
        setupButton(this.backBtn, 0.3, null);
        this.backBtn.on('pointerdown', () => {
            this.sound.play('clickSFX', { volume: 0.5 });
            this.time.delayedCall(150, () => {
                this.scene.start(this.returnTo, { returnTo: this.originalLevel });// Back to previous level or pause menu
            });
        });
    }
}
