class preloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }
    
    preload() {
        // Menu loader
        this.load.image('levelOneBG', 'assets/images/backgrounds/Green.png');
        this.load.image('menuBg1', 'assets/images/backgrounds/Background - Menu.png');
        this.load.image('menuOpacity', 'assets/images/backgrounds/black.jpg');
        this.load.image('gameTitle', 'assets/images/UI/Title - Menu.png');
        this.load.image('startBtn', 'assets/images/UI/Start Button - Menu.png');
        this.load.image('statsBtn', 'assets/images/UI/Stats Button - Menu.png');
        this.load.image('creditBtn', 'assets/images/UI/Credits - Menu.png');
        this.load.image('settingsBtn', 'assets/images/UI/Settings Menu - Menu.png');
        this.load.image('exitBtn', 'assets/images/UI/Exit - Menu.png');

        // Level loader
        this.load.image('levelOneCG', 'assets/images/UI/Level1 - Selector.png');
        this.load.image('levelTwoCG', 'assets/images/UI/Level2 - Selector.png');
        this.load.image('levelThreeCG', 'assets/images/UI/Level3 - Selector.png');

        // Game loader
        this.load.image('ground', 'assets/images/platform/platform.png');
        this.load.image('character', 'assets/images/characters/character.png');
        this.load.image('object', 'assets/images/characters/object.png');

        // Game menu loader
        this.load.image('gameRetry', 'assets/images/UI/Retry - button.png');
        this.load.image('gamePause', 'assets/images/UI/Pause - button.png');
        this.load.image('gamePaused', 'assets/images/UI/Paused.png');
        this.load.image('gameContinue', 'assets/images/UI/Continue - button.png');
        this.load.image('gameSettings', 'assets/images/UI/Settings - button.png');
        this.load.image('mainMenu', 'assets/images/UI/Main Menu - button.png');

        // Sound loader
        this.load.audio('clickSFX', 'assets/sounds/tap.wav');
        this.load.audio('death_sound', 'assets/sounds/death_sound.mp3');
        this.load.audio('win_sound', 'assets/sounds/win_sound.wav');
        this.load.audio('jump_sound', 'assets/sounds/jump_sound.wav');


        // Music loader
        this.load.audio('menuMusic', 'assets/music/mainMenu - music.mp3');
        this.load.audio('gameMusic', 'assets/music/gameMenu - music.mp3');
    }

    create() {
        this.scene.start('mainMenu');
    }
}