const toRender = [];
const ships = [];
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

        this.load.image('terizan', '../static/imgs/Terizan.png')
    },
    create(){
        this.add.image(2900, 300, 'sky');

        planet = this.physics.add.staticImage(5422, 311, 'terizan')
        this.cameras.main.setBounds(0,0,6000,1000)
        
        this.createShip()
        
        this.physics.world.on('overlap', (b1, b2) => {
            b1.stop()
            b2.stop()
        })

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
    createShip(){
        let ship = this.physics.add.image(400, 300, 'ship');
        let particles = this.add.particles('fire');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0, end: 1 },
            blendMode: 'ADD'
        });
        ship.flipX = true
        ship.setDrag(0.2)
        ship.setMaxVelocity(200)
        ship.setBounce(0, 0);
        emitter.startFollow(ship);

        this.physics.add.collider(ship, planet)
        ships.push(ship)
        console.log(ships)
    },
    update(time, delta){
        controls.update(delta)
        console.log()
        for(key in Object.keys(ships)){
            ships[key].setAcceleration(20)
            ships[key].setVelocity(200,0)    
        }
    }
})