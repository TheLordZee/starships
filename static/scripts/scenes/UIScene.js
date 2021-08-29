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
        let x = 30
        let y = 560
        let m = Player.side === 'light' ? 'cherub' : 'star'
        let minerBtn = this.add.image(x, y, 'shipBtn')
        .setInteractive()
        .on('pointerdown', () => {
            if(Player.materials > 10){
                game.createMiner(m, true)
                Player.materials -= 10;
            }
        })
        let miner = this.add.image(x, y, m)
        let cost = this.add.text(x, y+10, `10`, {font: '24px Anton-Regular', fill: '#fff'})
        miner.flipX = true
        miner.scaleX = 0.5           
        miner.scaleY = 0.5
        x += 150
        
        for(let ship of Player.ships){
            new ShipBtn(this, x, y, ship['name'], ship['cost'])
            x += 150
        }
        

        const materialIncreaser = this.time.addEvent({
            delay: 2000,
            callback: ()=> {
                this.updateMaterials(Player.materials++)
                Enemy.materials++        
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