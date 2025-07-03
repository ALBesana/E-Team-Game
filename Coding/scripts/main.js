const config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 670,
    parent: 'gameContainer',
    scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center both horizontally and vertically
    // Optional:
    // pageAlignHorizontally: true,
    // pageAlignVertically: true,
  },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800},
            debug: false
        }
    },
    scene: [ preloadScene, mainMenu, statsScene, creditsScene, settingsScene, levelSelector, levelOne, levelTwo, levelThree, pauseMenuScene, gameSettingsScene]
};

let game = new Phaser.Game(config);
