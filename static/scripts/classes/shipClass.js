class Miner extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, wRock, side, isPlayer){
        super(scene, x, y, texture);
        this.noRock = texture;
        this.wRock = wRock;
        scene.physics.world.enable(this)
        scene.add.existing(this);
        this.side = side;
        this.health = 5;
        this.speed = isPlayer ? 200 : -200
        this.acceleration = 30
        this.body.maxVelocity.x = isPlayer ? 200 : -200
        this.body.immovable = true
        this.hasRock = false
        this.isPlayer = isPlayer
        this.type = 'miner'
    }
    getRock(){
        this.hasRock = true
        this.setTexture(this.wRock)
        this.flipX = this.isPlayer ? false : true
        this.speed = -this.speed
    }
    addMaterials(){
        if(this.hasRock){
            let owner = this.isPlayer ? Player : Enemy;
            owner.materials += 5;
            this.setTexture(this.noRock);
            this.flipX = this.isPlayer ? true : false;
            this.speed = -this.speed
        }
    }
} 
class Ship extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, health, speed, acceleration, firerate, damage, side, isPlayer){
        super(scene, x, y, texture);
        scene.physics.world.enable(this)
        scene.add.existing(this);
        this.health = health;
        this.speed = isPlayer ? speed : -speed
        this.acceleration = acceleration
        this.body.maxVelocity.x = speed
        this.firerate = firerate;
        this.damage = damage;
        this.side = side;
        this.name = texture;
        this.canShoot = true;
        this.body.immovable = true
        this.hasTarget = false
        this.type = 'ship'
        this.isPlayer = isPlayer
    }
    shotDelay(scene){
        this.canShoot = false;
        const delay = scene.time.addEvent({
            delay: 10000 / this.firerate,
            callback: ()=> {
                this.canShoot = true
            }
        })      
    }
    shoot(scene, target){
        this.hasTarget = true
        if(this.canShoot){
            console.log(target.type)
            let x
            if(this.parentContainer.isPlayer){
                x = this.parentContainer.x + 20
            }else{
                x = this.parentContainer.x - 20
            }

            let y = this.parentContainer.y
            let shot = this.side === 'light' ? scene.physics.add.image(x, y, 'blueLaser') : scene.physics.add.image(x, y, 'redLaser'); 

            if(target.type === 'planet'){
                scene.physics.add.collider(shot, target, (laser, planet) => {
                    console.log('planet health:', planet.health)
                    planet.health -= this.damage
                    if(planet.health <= 0){
                        planet.destroy()
                        game.scene.scenes[1].add.text(100, 0, `You ${target === Player.planet ? 'Lost!' : 'Won!'}`, {font: '240px Anton-Regular', fill: '#fff'})
                    }
                    laser.destroy()
                })
                shot.rotation = Phaser.Math.Angle.BetweenPoints(shot, target) 
                scene.physics.moveToObject(shot, target, 400);
            }else{
                let enemies = this.side === 'light' ? darkShips : lightShips;
                for(let key = 0; key < enemies.length; key++){
                    scene.physics.add.collider(shot, enemies[key].ship, (laser, ship) => {
                        console.log('health:', ship.health)
                        ship.health -= this.damage
                        if(ship.health <= 0){
                            let friends
                            if(ship.side === 'light'){
                                friends = darkShips
                            }else{
                                friends = lightShips
                            }
                            enemies.splice(key, 1)
                            for(let friend of friends){
                                friend.ship.hasTarget = friend.detector.body.checkCollision.none
                            }
                            ship.parentContainer.destroy()
                        }
                        laser.destroy()
                    })
                }
                shot.rotation = Phaser.Math.Angle.BetweenPoints(shot, target.parentContainer)
                scene.physics.moveToObject(shot, target.parentContainer, 400); 
            }
            if(this.parentContainer.isPlayer){
                Player.shots.push(shot)
            }else{
                Enemy.shots.push(shot)
            }
            this.shotDelay(scene)
        }
    }
    preupdate(time, delta){
        super.preupdate(time, delta)
    }
}

class ShipObject extends Phaser.GameObjects.Container{
    constructor(scene, x, y, texture, health, speed, acceleration, firerate, damage, side, isPlayer){
        super(scene, x, y)
        scene.add.existing(this)
        console.log(this)
        let ship = new Ship(scene, 0, 5, texture, health, speed, acceleration, firerate, damage, side, isPlayer)
        this.add(ship)
        let detector
        if(isPlayer){
            detector = scene.physics.add.image(0, 30, 'detector')
            detector.body.setSize(500, 1200, 1).setOffset(0, -600)    
        } else {
            detector = scene.physics.add.image(0, -30, 'detector')
            detector.body.setSize(1200, 1200, 1).setOffset(-1200, -600)
        }  
        this.add(detector)
        scene.physics.world.enableBody(this)
        ship.setOrigin(.5)
        this.body.width = 10
        this.body.height = 10
        this.ship = ship
        this.detector = detector
        this.moving = true
        this.type = 'ship'
    }
}

///Light ships

class Paradox extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'paradox', 10, 400, 50, 20, 1, 'light', isPlayer)
    }
}

class Destiny extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'destiny', 50, 300, 30, 15, 5, 'light', isPlayer)
    }
}

class Divinity extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'divinity', 100, 300, 30, 20, 15, 'light', isPlayer)
    }
}

class Endmyion extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'endymion', 200, 300, 30, 15, 20, 'light', isPlayer)
    }
}

class Lux extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'lux', 500, 250, 30, 15, 50, 'light', isPlayer)
    }
}

class Immortalty extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'immortality', 1500, 200, 20, 10, 100, 'light', isPlayer)
    }
}
///Dark Ships
class Raptor extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'raptor', 10, 400, 50, 20, 1, 'dark', isPlayer)
    }
}

class Cerberus  extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'cerberus', 50, 300, 30, 15, 5, 'dark', isPlayer)
    }
}

class Onyx extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'onyx', 100, 300, 30, 20, 15, 'dark', isPlayer)
    }
}

class Heritage extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'heritage', 200, 300, 30, 15, 20, 'dark', isPlayer)
    }
}

class Devastator extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'devastator', 500, 250, 30, 15, 50, 'dark', isPlayer)
    }
}

class Pawn extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'pawn', 1000, 200, 20, 10, 100, 'dark', isPlayer)
    }
}