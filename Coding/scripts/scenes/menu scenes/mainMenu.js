class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }

    create() {
        this.menuBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'menuBg').setOrigin(0, 0);
    }

    update() {
        this.menuBackground.tilePositionY -= 0.2;
    }
}