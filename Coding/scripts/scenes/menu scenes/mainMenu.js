class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
        this.menuBackground = this.add.tileSprite(0, 0, 3508, 2480, 'menuBg1').setScale(0.2745).setOrigin(0, 0);
        this.menuTitle = this.add.image(this.scale.width / 2.85, 133, 'gameTitle').setScale(0.15);
        
        this.menuStart = this.add.image(this.scale.width / 4.3, 280, 'startBtn').setScale(0.1).setInteractive();
        this.menuStart.on('pointerdown', () => {
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
                this.scene.start('levelOne');
            });
        });
        
        this.menuStats = this.add.tileSprite(210, 415, 3508, 2480, 'statsBtn').setScale(0.1).setInteractive();
        this.menuStats.on('pointerdown', () => {
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
                this.scene.start('statsScene');
            });
        });

        this.menuCreds = this.add.tileSprite(230, 538, 3508, 2480, 'creditBtn').setScale(0.068).setInteractive();
        this.menuCreds.on('pointerdown', () => {
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
                this.scene.start('creditsScene');
            });
        });

        this.menuSettings = this.add.tileSprite(845, 600, 3508, 2480, 'settingsBtn').setScale(0.017).setInteractive();
        this.menuSettings.on('pointerdown', () => {
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
                this.scene.start('settingsScene');
            });
        });
        
        this.menuExit = this.add.tileSprite(900, 600, 3508, 2480, 'exitBtn').setScale(0.021).setInteractive();
        this.menuExit.on('pointerdown', () => {
            alert('You have quit the game.');
            // this.sound.play('clickSFX');

            this.time.delayedCall(150, () => {
            
                this.add.rectangle(
                this.scale.width / 2,
                this.scale.height / 2,
                this.scale.width,
                this.scale.height,
                0x000000,
                0.8
            ).setOrigin(0.5);

        // Add centered "Game Quit" text
            this.add.text(
                this.scale.width / 2,
                this.scale.height / 2,
                'Game Quit',
                {
                    fontSize: '48px',
                    fill: '#ffffff',
                    fontFamily: 'Arial'
                }
            ).setOrigin(0.5);
            
            this.sys.game.loop.stop();
            });
        });
    }

    update() {
        // this.menuBackground.tilePositionY -= 0.2;
    }
}