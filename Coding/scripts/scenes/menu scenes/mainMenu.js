class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
        this.menuBackground = this.add.tileSprite(0, 0, 3508, 2480, 'menuBg1').setScale(0.2745).setOrigin(0, 0);
        this.menuTitle = this.add.tileSprite(300, 140, 3508, 2480, 'gameTitle').setScale(0.15);
        this.menuStart = this.add.tileSprite(240, 280, 3508, 2480, 'startBtn').setScale(0.1);
        this.menuStats = this.add.tileSprite(210, 415, 3508, 2480, 'statsBtn').setScale(0.1);
        this.menuCreds = this.add.tileSprite(230, 538, 3508, 2480, 'creditBtn').setScale(0.068);
        this.menuSettings = this.add.tileSprite(845, 600, 3508, 2480, 'settingsBtn').setScale(0.017);
        this.menuExit = this.add.tileSprite(900, 600, 3508, 2480, 'exitBtn').setScale(0.021);
    }

    update() {
        // this.menuBackground.tilePositionY -= 0.2;
    }
}