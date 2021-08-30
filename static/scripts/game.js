let config = {
    type: Phaser.AUTO,
    physics:{
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: {y: 0}
        }
    },
    scale: {
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 600,
    },
    scene: [StartScene, GameScene, UIScene, EndScene]
};

let game = new Phaser.Game(config);
