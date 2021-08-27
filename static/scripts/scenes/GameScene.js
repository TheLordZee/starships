const toRender = [];
const ships = [];
const enemies = [];
const GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameScene(){
        let controls;
        let cursors; 
        Phaser.Scene.call(this, {key: 'GameScene'});    
    },

    preload(){
        this.load.image('ship', '../static/imgs/WhiteSide/ImmortalityClass.png')
        this.load.image('fire', '../static/imgs/fire.png')
        this.load.image('sky', '../static/imgs/space2.png');
        this.load.image('destiny', '../static/imgs/WhiteSide/DestinyClass.png')
        this.load.image('terizan', '../static/imgs/Terizan.png')
        this.load.image('pawn', '../static/imgs/DarkSide/PawnClass.png')
    },
    create(){
        this.add.image(2900, 300, 'sky');

        Player.planet = this.physics.add.staticImage(5422, 311, 'terizan')
        this.cameras.main.setBounds(0,0,6000,1000)
        this.physics.world.on('overlap', (b1, b2) => {
            b1.stop()
            b2.stop()
        })
        this.add.image(5000, 300, 'pawn')
        this.createShip('immortality')
        this.createEnemy('pawn')

        let cursors = this.input.keyboard.createCursorKeys();

        let controlConfig = {
            camera: this.cameras.main,
            right: cursors.right,
            left: cursors.left,
            up: null,
            down: null,
            zoomIn: null,
            zoomOut: null,
            minZoom: 0.001,
            maxZoom: 1000,
            acceleration: 1.0,
            drag: 0.5,
            maxSpeed: 1.0
        }
        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
    },
    createShip(shipName){
        let ship;
        switch(shipName){
            case 'immortality':
                ship = new Immortalty(this, 400, Phaser.Math.Between(50,550))
                break;
            case 'destiny':
                ship = new Destiny(this, 400, Phaser.Math.Between(50,550))
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }

        console.log('ship',ship)
        ship.flipX = true
        ship.shoot()

        let particles = this.add.particles('fire');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0, end: 1 },
            blendMode: 'ADD'
        });
        emitter.startFollow(ship);
        
        this.physics.add.collider(ship, Player.planet)
        ships.push(ship)
        for(let enemy of enemies){
            this.physics.add.collider(ship, enemy)
        }
        console.log(ships)
    },
    createEnemy(shipName){
        let enemy
        switch(shipName){
            case 'pawn':
                enemy = new Pawn(this, 5100, Phaser.Math.Between(50,550))
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }
        for(let ship of ships){
            this.physics.add.collider(ship, enemy)
        }
        enemies.push(enemy)
    },
    update(time, delta){
        controls.update(delta)
        console.log()
        for(key in Object.keys(ships)){
            ships[key].body.acceleration = ships[key].acceleration
            ships[key].body.velocity['x'] = ships[key].speed
        }
    }
})