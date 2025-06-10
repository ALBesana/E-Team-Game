class preloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }
    
    preload() {
        this.load.image('menuBg', 'assets/images/backgrounds/Green.png');
    }

    create() {
        this.scene.start('mainMenu');
    }
}