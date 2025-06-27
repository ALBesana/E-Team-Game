class preloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }
    
    preload() {
        // Menu loader
        this.load.image('levelOneBG', 'assets/images/backgrounds/Green.png');
        this.load.image('menuBg1', 'assets/images/backgrounds/Background - Menu.png');
        this.load.image('gameTitle', 'assets/images/UI/Title - Menu.png');
        this.load.image('startBtn', 'assets/images/UI/Start Button - Menu.png');
        this.load.image('statsBtn', 'assets/images/UI/Stats Button - Menu.png');
        this.load.image('creditBtn', 'assets/images/UI/Credits - Menu.png');
        this.load.image('settingsBtn', 'assets/images/UI/Settings Menu - Menu.png');
        this.load.image('exitBtn', 'assets/images/UI/Exit - Menu.png');
        this.load.image('ground', 'assets/images/platform/platform.png');
        this.load.image('character', 'assets/images/characters/character.png')
        this.load.image('object', 'assets/images/characters/object.png')
    }

    create() {
        this.scene.start('mainMenu');
    }
}