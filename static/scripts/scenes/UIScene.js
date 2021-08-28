const UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function UIScene(){
        Phaser.Scene.call(this, {key: 'UIScene', active: true})
        this.materials = 0
    },
    preload(){
        this.load.image('shipBtn', '../static/imgs/button.png')
    },
    create(){
        this.materialInfo = this.add.text(10,10, '', {font: '24px Arial', fill: '#FFFF00'})
        const game = this.scene.get('GameScene');
        let testBtn = new ShipBtn(600, 560, 'destiny', 10)
        const button1 = this.add.image(300, 560, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(Player.materials > 10){
                    Player.materials -= 10;
                    game.createLightShip('immortality', true)
                }
            })
        const ship1 = this.add.image(300, 560, 'ship')
        ship1.flipX = true
        ship1.scaleX = .25
        ship1.scaleY = .25


        const button2 = this.add.image(450, 560, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(Player.materials > 1){
                    Player.materials -= 1;
                    game.createLightShip('destiny', true)
                }
            })
        const ship2 = this.add.image(450, 560, 'destiny')
        ship2.flipX = true
        ship2.scaleX = .5
        ship2.scaleY = .5

        const materialIncreaser = this.time.addEvent({
            delay: 1000,
            callback: ()=> {
                this.updateMaterials(Player.materials++)        
            },
            loop: true
        })      

        // const ship = this.add.image(300, 560, 'ship')
        // ship.flipX = true
        // ship.scaleX = .25
        // ship.scaleY = .25
        this.updateMaterials(Player.materials)
    },
    updateMaterials(materials){
        this.materialInfo.setText(`Materials: ${materials}`)
    }
})