class levelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'levelOne' });
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

        this.platforms = this.add.group(); 

        const platData = [
            { x: 400, y: 585, w: 800 },
            { x: 600, y: 450, w: 150 },
            { x: 50, y: 300, w: 500 },
            { x: 750, y: 270, w: 100 }
        ];

        platData.forEach(p => {
            let plat = this.add.tileSprite(p.x, p.y, p.w, 32, 'ground');
            this.physics.add.existing(plat, true);
            this.platforms.add(plat);
        });
    }

    update() {
        this.gameBackground.tilePositionY -= 0.3;
    }
}