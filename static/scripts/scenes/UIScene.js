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
        let materials = 0
        this.materialInfo = this.add.text(10,10, '', {font: '24px Arial', fill: '#FFFF00'})
        const game = this.scene.get('GameScene');

        const button = this.add.image(300, 560, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(materials > 10){
                    materials -= 10;
                    game.createShip()
                }
            })
        const materialIncreaser = this.time.addEvent({
            delay: 1000,
            callback: ()=> {
                this.updateMaterials(++materials)        
            },
            loop: true
        })      
        const ship = this.add.image(300, 560, 'ship')
        ship.flipX = true
        ship.scaleX = .25
        ship.scaleY = .25
        console.log(ship)
        this.updateMaterials(materials)
    },
    updateMaterials(materials){
        this.materialInfo.setText(`Materials: ${materials}`)
    }
})