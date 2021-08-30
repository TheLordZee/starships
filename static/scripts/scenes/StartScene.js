const StartScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene ()
    {
        Phaser.Scene.call(this,  {key: 'StartScene'})
    },

    preload: function () {
        this.load.image('startbg', '../static/imgs/startbg.png')
        this.load.image('startBtn', '../static/imgs/button.png')

        this.load.image('light', '../static/imgs/WhiteSide/ImmortalityClass.png')
        this.load.image('dark', '../static/imgs/DarkSide/PawnClass.png')
    },
    create: function () {
        console.log('New Scene')
        this.add.image(500, 300, 'startbg')
        this.add.text(40, 0, 'Starships At War', {font: '150px Robus', fill: '#fffff0'})
        this.add.text(250, 150, 'Pick Your Side', {font: '100px Robus', fill: '#fffff0'})
        const lightBtn = this.add.image(400, 400, 'startBtn')
        .setInteractive()
        .on('pointerdown', () => {
            console.log('light')
            Player = new User('light')
            Enemy = new User('dark')
            this.scene.stop()
            this.scene.launch('GameScene')
            this.scene.launch('UIScene')
        })
        const light = this.add.image(400, 400, 'light')
        light.setScale(0.4)
        light.flipX = true
        const darkBtn = this.add.image(600, 400, 'startBtn')
        .setInteractive()
        .on('pointerdown', () => {
            Enemy = new User('light')
            Player = new User('dark')
            this.scene.stop()
            this.scene.launch('GameScene')
            this.scene.launch('UIScene')
        })
        const dark = this.add.image(600, 400, 'dark')
        dark.setScale(0.4)
    }
});