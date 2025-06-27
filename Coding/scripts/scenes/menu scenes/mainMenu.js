class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
        this.menuBackground = this.add.tileSprite(0, 0, 3508, 2480, 'menuBg1').setScale(1).setOrigin(0, 0);
        this.menuTitle = this.add.image(this.scale.width / 2.85, 133, 'gameTitle').setScale(1);

        this.menuStart = this.add.image(this.scale.width / 4.3, 300, 'startBtn').setScale(0.07).setInteractive();
        this.menuStart.on('pointerdown', () => {
            this.time.delayedCall(150, () => {
                this.scene.start('levelOne');
            });
        });

        this.menuStats = this.add.image(210, 420, 'statsBtn').setScale(0.07).setInteractive();
        this.menuStats.on('pointerdown', () => {
            this.time.delayedCall(150, () => {
                this.scene.start('statsScene');
            });
        });

        this.menuCreds = this.add.image(230, 550, 'creditBtn').setScale(0.4).setInteractive();
        this.menuCreds.on('pointerdown', () => {
            this.time.delayedCall(150, () => {
                this.scene.start('creditsScene');
            });
        });

        this.menuSettings = this.add.image(835, 600, 'settingsBtn').setScale(0.12).setInteractive();
        this.menuSettings.on('pointerdown', () => {
            this.time.delayedCall(150, () => {
                this.scene.start('settingsScene');
            });
        });

        this.menuExit = this.add.image(900, 600, 'exitBtn').setScale(0.13).setInteractive();
        this.menuExit.on('pointerdown', () => {
            alert('You have quit the game.');
            this.time.delayedCall(150, () => {
                this.add.rectangle(
                    this.scale.width / 2,
                    this.scale.height / 2,
                    this.scale.width,
                    this.scale.height,
                    0x000000,
                    0.8
                ).setOrigin(0.5);

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
        // Optional scrolling background
        // this.menuBackground.tilePositionY -= 0.2;
    }
}
