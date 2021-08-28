class ShipBtn {
    constructor(scene, x, y, ship, cost){
        this.btn = scene.add.image(x, y, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(Player.materials > cost){
                    switch(Player.side){
                        case 'light':
                            game.scene.scenes[0].createLightShip(ship, true)
                            break;
                        case 'dark':
                            game.scene.scenes[0].createDarkShip(ship, true)
                            break;
                    }
                    Player.materials -= cost;
                }
            })
        
        this.ship = scene.add.image(x, y, ship)
        this.cost = scene.add.text(x, y+10, `${cost}`, {font: '24px Anton-Regular', fill: '#fff'})
        this.ship.flipX = true
        this.ship.scaleX = 0.5           
        this.ship.scaleY = 0.5
    }
}
