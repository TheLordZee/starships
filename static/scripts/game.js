let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            fps: 60,
            gravity: {y: 0}
        }
    },
    scene: [GameScene, UIScene]
};

let game = new Phaser.Game(config);
