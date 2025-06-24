const config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 640,
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
    scene: [ preloadScene, mainMenu ]
};

let game = new Phaser.Game(config);
