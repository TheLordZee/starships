class Ship extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, health, speed, acceleration, firerate, damage, side){
        super(scene, x, y, texture);
        scene.physics.world.enable(this)
        scene.add.existing(this);
        this.health = health;
        this.speed = speed
        this.acceleration = acceleration
        this.body.maxVelocity.x = speed
        this.body.maxVelocity.y = speed / 2
        this.firerate = firerate;
        this.damage = damage;
        this.side = side;
        this.name = texture;
        this.canShoot = true;
        this.body.immovable = true
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
        if(this.canShoot){
            // console.log(target)
            let x
            if(this.parentContainer.isPlayer){
                x = this.parentContainer.x + 200
            }else{
                x = this.parentContainer.x - 200
            }

            let y = this.parentContainer.y
            let shot; 
            let enemies;
            if(this.side === 'light'){
                shot = scene.physics.add.image(x, y, 'blueLaser')
                enemies = darkShips
            }else{
                shot = scene.physics.add.image(x, y, 'redLaser')
                enemies = lightShips
            }
            console.log(target)
            for(let key in Object.keys(enemies)){
                scene.physics.add.collider(shot, enemies[key].ship, (laser, ship) => {
                    console.log('health:', ship.health)
                    ship.health -= this.damage
                    if(ship.health <= 0){
                        ship.parentContainer.destroy()
                    }
                    laser.destroy()
                })
            }
            if(this.parentContainer.isPlayer){
                Player.shots.push(shot)
            }else{
                Enemy.shots.push(shot)
            }
            shot.rotation = Phaser.Math.Angle.BetweenPoints(shot, target.parentContainer) 
            scene.physics.moveToObject(shot, target.parentContainer, 200);
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
        let ship = new Ship(scene, 0, 30, texture, health, speed, acceleration, firerate, damage, side)
        this.add(ship)
        this.isPlayer = isPlayer
        let detector
        if(this.isPlayer){
            detector = scene.physics.add.image(0, 30, 'detector')
            detector.body.setSize(1200, 1200, 1).setOffset(0, -600)    
        } else {
            detector = scene.physics.add.image(0, -30, 'detector')
            detector.body.setSize(1200, 1200, 1).setOffset(-1200, -600)
        }  
        this.add(detector)
        scene.physics.world.enableBody(this)
        ship.setOrigin(.5)
        this.ship = ship
        this.detector = detector
        this.moving = true
    }
}
// let test = this.physics.add.image(300, 300, 'detector')
// test.body.setSize(1500, 1200, 1).setOffset(200, -600)
// let c = this.add.container(0, 0)

// this.physics.world.enableBody(c);
// c.setSize(500, 500)
// c.add(test)
// c.add(i)
// // c.body.setAccelerationX(20)
// c.body.setVelocityX(200)
// console.log(c)
// console.log('test',test)

class Immortalty extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'ship', 1000, 200, 20, 10, 100, 'light', isPlayer)
    }
}

class Destiny extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'destiny', 100, 300, 30, 15, 10, 'light', isPlayer)
    }
}
class Pawn extends ShipObject{
    constructor(scene, x, y, isPlayer){
        super(scene, x, y, 'pawn', 1000, 200, 20, 10, 100, 'dark', isPlayer)
    }
}