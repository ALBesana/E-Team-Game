class creditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' });
    }

    create() {
        this.gameBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'levelOneBG').setOrigin(0, 0);
        this.backHolder = this.add.image(this.scale.width / 1.05, 600, 'exitBtn').setScale(0.021).setInteractive();
        this.backHolder.on('pointerdown', () => {
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
                this.scene.start('mainMenu');
            });
        });
    }

    update() {
        this.gameBackground.tilePositionY -= 0.3;
    }
}