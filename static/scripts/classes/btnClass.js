class ShipBtn {
    constructor(x, y, ship, cost){
        this.btn = game.scene.scenes[1].add.image(x, y, 'shipBtn')
            .setInteractive()
            .on('pointerdown', () => {
                if(Player.materials > cost){
                    Player.materials -= cost;
                    switch(Player.side){
                        case 'light':
                            game.scene.scenes[0].createLightShip(ship, true)
                            break;
                        case 'dark':
                            game.scene.scenes[0].createDarkShip(ship, true)
                            break;
                    }
                        
                }
            })
        this.ship = game.scene.scenes[1].add.image(x, y, ship)
        this.ship.flipX = true
        this.scaleX = .25           
        this.scaleY = .25
    }
}

// const button1 = this.add.image(300, 560, 'shipBtn')
//     .setInteractive()
//     .on('pointerdown', () => {
//         if(materials > 10){
//             materials -= 10;
//             game.createShip('immortality')
//         }
//     })
// const ship1 = this.add.image(300, 560, 'ship')
// ship1.flipX = true
// ship1.scaleX = .25
// ship1.scaleY = .25