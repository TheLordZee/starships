class Miner extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, wRock, side, isPlayer){
        super(scene, x, y, texture);
        this.noRock = texture;
        this.wRock = wRock;
        scene.physics.world.enable(this)
        scene.add.existing(this);
        this.side = side;
        this.health = 5;
        this.speed = isPlayer ? 100 : -100
        this.acceleration = 30
        this.body.immovable = true
        this.hasRock = false
        this.isPlayer = isPlayer
        this.class = 'miner'
    }
    getRock(){
        if(!(this.hasRock)){
            this.hasRock = true
            this.setTexture(this.wRock)
            this.flipX = this.isPlayer ? false : true
            this.speed = -this.speed
        }
    }
    addMaterials(){
        if(this.hasRock){
            let owner = this.isPlayer ? Player : Enemy;
            owner.materials += 5;
            this.setTexture(this.noRock);
            this.flipX = this.isPlayer ? true : false;
            this.speed = -this.speed
            this.hasRock = false
        }
    }
}

class ShipObject extends Phaser.GameObjects.Container{
    constructor(scene, x, y, texture, health, speed, acceleration, firerate, damage, side, isPlayer){
        super(scene, x, y)
        scene.add.existing(this)
        scene.physics.world.enableBody(this)
        let detector
        if(isPlayer){
            detector = scene.physics.add.image(0, 30, 'detector')
            detector.body.setSize(600, 1200, 1).setOffset(0, -600)    
        } else {
            detector = scene.physics.add.image(0, -30, 'detector')
            detector.body.setSize(600, 1200, 1).setOffset(-600, -600)
        }  
        this.add(detector)
        this.detector = detector
        this.ship = scene.physics.add.image(0, 0, texture)
        this.ship.body.immovable = true
        this.detector.body.immovable = true
        this.add(this.ship)
        this.health = health;
        this.speed = isPlayer ? speed : -speed;
        this.acceleration = acceleration;
        this.body.maxVelocity.x = speed;
        this.firerate = firerate;
        this.damage = damage;
        this.side = side;
        this.name = texture;
        this.canShoot = true;
        this.body.immovable = true;
        this.hasTarget = false;
        this.isPlayer = isPlayer;
        this.body.width = 10
        this.body.height = 10
        this.class = 'ship'
    }
    shoot(scene, target){
        this.hasTarget = true
        if(this.canShoot){
            this.canShoot = false
            let x = this.isPlayer ? this.x + 20 : this.x - 20
            let y = this.y
            let shot = this.side === 'light' ? scene.physics.add.image(x, y, 'blueLaser') : scene.physics.add.image(x, y, 'redLaser'); 
            if(target.class === 'planet'){
                scene.physics.add.collider(shot, target, (laser, planet) => {
                    planet.health -= this.damage
                    if(planet.health <= 0){
                        planet.destroy()
                        console.log(game.scene)
                        this.scene.scene.pause()
                        game.scene.scenes[2].scene.stop()
                        this.scene.scene.launch('EndScene', planet === Player.planet ? 'lost' : 'won')     
                    }
                    laser.destroy()
                })
                shot.rotation = Phaser.Math.Angle.BetweenPoints(shot, target) 
                scene.physics.moveToObject(shot, target, 500);
            }else{
                let enemies = this.isPlayer ? Enemy.currShips : Player.currShips;
                scene.physics.add.collider(shot, target.ship, (laser, ship) => {
                    ship.parentContainer.health -= this.damage
                    if(ship.parentContainer.health <= 0){
                        for(let key = 0; key < enemies.length; key++){
                            if(enemies[key] === target){
                                enemies.splice(key, 1)
                            }
                        }
                        ship.parentContainer.destroy()
                        console.log('I survied!', ship)
                        let friends = this.isPlayer ? Player.currShips : Enemy.currShips
                        for(let friend of friends){
                            friend.hasTarget = friend.detector.body.checkCollision.none
                        }
                    }
                    laser.destroy()
                })  
                shot.rotation = Phaser.Math.Angle.BetweenPoints(shot, target)
                scene.physics.moveToObject(shot, target, 400); 
            }
            if(this.isPlayer){
                Player.shots.push(shot)
            }else{
                Enemy.shots.push(shot)
            }
            scene.shotDelay(this)
        }
    }
    preupdate(time, delta){
        super.preupdate(time, delta)
    }
}

///Light ships

class Paradox extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'paradox', 10, 300, 50, 20, 1, 'light', isPlayer)
    }
}

class Destiny extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'destiny', 50, 250, 30, 15, 10, 'light', isPlayer)
    }
}

class Immortalty extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'immortality', 500, 200, 20, 10, 100, 'light', isPlayer)
    }
}
///Dark Ships
class Raptor extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'raptor', 10, 300, 50, 20, 1, 'dark', isPlayer)
    }
}

class Cerberus  extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'cerberus', 50, 250, 30, 15, 10, 'dark', isPlayer)
    }
}

class Pawn extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'pawn', 500, 200, 20, 10, 100, 'dark', isPlayer)
    }
}