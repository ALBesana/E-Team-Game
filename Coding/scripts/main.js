const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
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
