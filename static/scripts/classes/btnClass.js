class ShipBtn {
    constructor(scene, x, y, ship, cost, scale){
        this.btn = scene.add.image(x, y, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(Player.materials > cost){
                    game.scene.scenes[1].createShip(ship, true)
                    Player.materials -= cost;
                }
            })
        
        this.ship = scene.add.image(x, y, ship)
        this.cost = scene.add.text(x, y+10, `${cost}`, {font: '24px Anton-Regular', fill: '#fff'})
        this.ship.flipX = true
        this.ship.scaleX = scale           
        this.ship.scaleY = scale
    }
}
