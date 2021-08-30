const EndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene ()
    {
        Phaser.Scene.call(this,  {key: 'EndScene'})
    },

    preload: function () {
        this.load.image('btn', '../static/imgs/button.png')
    },
    create: function (data) {
        this.add.text(250, 0, `You ${data === 'lost' ? 'Lost!' : 'Won!'}`, {font: '240px Robus', fill: '#fff'})
        const restartBtn = this.add.image(550, 360, 'btn')
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.stop()
            Player.reset()
            Enemy.reset()
            game.scene.scenes[1].registry.destroy(); 
            game.scene.scenes[1].events.off();
            game.scene.scenes[1].scene.restart();
            game.scene.scenes[2].registry.destroy(); 
            game.scene.scenes[2].events.off();
            game.scene.scenes[2].scene.restart();
        })
        restartBtn.setScale(1.1)
        let restart = this.add.text(465, 320, "Restart", {font: '60px Robus', fill: '#fff'})
        const menuBtn = this.add.image(550, 460, 'btn')
        .setInteractive()
        .on('pointerdown', () => {
            Player.reset()
            Enemy.reset()
            game.scene.scenes[1].registry.destroy(); 
            game.scene.scenes[1].events.off();
            game.scene.scenes[2].registry.destroy(); 
            game.scene.scenes[2].events.off();
            game.scene.scenes[1].scene.stop();
            this.scene.start('StartScene')
        })
        let menu = this.add.text(500, 420, "Menu", {font: '60px Robus', fill: '#fff'})
    }
});