class preloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preloadScene' });
    }
    
    preload() {
        // Menu loader
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
        this.load.atlas('character', 'assets/images/characters/characterSpritesheet.png', 'assets/images/characters/characterSpritesheet.json');
        this.load.image('object', 'assets/images/characters/object.png');
        this.load.image('levelBG1', 'assets/images/backgrounds/Level1BckGrnd.png');
        this.load.image('levelBG2', 'assets/images/backgrounds/Level2BckGrnd.png');
        this.load.image('levelBG3', 'assets/images/backgrounds/Level3BckGrnd.png');

        // Game menu loader
        this.load.image('gameRetry', 'assets/images/UI/Retry - button.png');
        this.load.image('gamePause', 'assets/images/UI/Pause - button.png');
        this.load.image('gamePaused', 'assets/images/backgrounds/Paused.png');
        this.load.image('gameContinue', 'assets/images/UI/Continue - button.png');
        this.load.image('gameSettings', 'assets/images/UI/Settings - button.png');
        this.load.image('mainMenu', 'assets/images/UI/Main Menu - button.png');

        // Settings loader
        this.load.image('gameSettingsBg', 'assets/images/backgrounds/Settings - Background.png');
        this.load.image('fullscreenBtn', 'assets/images/UI/Fullscreen Button - Settings.png');
        this.load.image('windowedBtn', 'assets/images/UI/Windowed Button - Settings.png');
        this.load.image('soundOnBtn', 'assets/images/UI/Sound On Button - Settings.png');
        this.load.image('soundOffBtn', 'assets/images/UI/Sound Off Button - Settings.png');
        this.load.image('backBtn', 'assets/images/UI/Back Button.png');

        // Sound loader
        this.load.audio('clickSFX', 'assets/sounds/tap.wav');
        this.load.audio('death_sound', 'assets/sounds/death_sound.mp3');
        this.load.audio('win_sound', 'assets/sounds/win_sound.wav');
        this.load.audio('jump_sound', 'assets/sounds/jump_sound.wav');


        // Music loader
        this.load.audio('menuMusic', 'assets/music/mainMenu - music.mp3');
        this.load.audio('gameMusic1', 'assets/music/levelOne - music.mp3');
        this.load.audio('gameMusic2', 'assets/music/levelTwo - music.mp3');
        this.load.audio('gameMusic3', 'assets/music/levelThree - music.mp3');
    }

    create() {
        if (this.registry.get('isSoundMuted') === true) {
            this.sound.mute = true;
        }

        this.scene.start('mainMenu');
    }
}