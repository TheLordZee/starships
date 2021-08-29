class Planet extends Phaser.GameObjects.Image   {
    constructor(scene, planet, isPlayer){
        let x
        if(isPlayer){
            x = 300
        }else{
            x = 5422
        }
        super(scene, x, 311, planet);
        scene.physics.world.enable(this)
        scene.add.existing(this);
        this.maxHealth = 10000
        this.health = 10000
        this.body.immovable = true
        this.class = 'planet'
        this.healthBar= this.makeBar(scene, x - 200, 50);
        this.setValue(this.healthBar, (this.health/this.maxHealth)* 100);
    }
    makeBar(scene, x, y){
        let bar = scene.add.graphics();
        bar.fillStyle(0x50C878, 1);
        bar.fillRect(0, 0, 400, 10);
        bar.x = x;
        bar.y = y;
        return bar;
    }
    setValue(bar, percentage){
        bar.scaleX = percentage/100;
    }
}