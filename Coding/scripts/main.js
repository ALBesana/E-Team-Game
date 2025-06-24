const config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 640,
    parent: 'gameContainer',
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center both horizontally and vertically
    // Optional:
    // pageAlignHorizontally: true,
    // pageAlignVertically: true,
  },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [ preloadScene, mainMenu, statsScene, creditsScene, settingsScene, levelOne ]
};

let game = new Phaser.Game(config);
