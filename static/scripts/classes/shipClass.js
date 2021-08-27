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
        console.log(game.scene.scenes[0])
        this.target = Player.planet;
        console.log(this)
    }
    shoot(){
        const scene = game.scene.scenes[0]
        console.log('game', game)
    }
    preupdate(time, delta){
        super.preupdate(time, delta)
    }
}

class Immortalty extends Ship{
    constructor(scene, x, y){
        super(scene, x, y, 'ship', 1000, 200, 20, 10, 100, 'light')
    }
}

class Destiny extends Ship{
    constructor(scene, x, y){
        super(scene, x, y, 'destiny', 100, 300, 30, 15, 10, 'light')
    }
}
class Pawn extends Ship{
    constructor(scene, x, y){
        super(scene, x, y, 'pawn', 1000, 200, 20, 10, 100, 'light')
    }
}