let config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: {y: 0}
        }
    },
    scene: [StartScene, GameScene, UIScene, EndScene]
};

let game = new Phaser.Game(config);
