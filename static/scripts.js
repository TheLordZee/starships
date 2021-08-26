const GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameScene(){
        let controls;
        let cursors;
        let ship;
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
        ship = this.physics.add.image(400, 300, 'ship');
        let particles = this.add.particles('fire');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        ship.flipX = true
        ship.setDrag(0.2)
        ship.setMaxVelocity(200)
        ship.setBounce(1, 1);
        emitter.startFollow(ship);
        this.cameras.main.setBounds(0,0,6000,1000)

        this.physics.add.collider(ship, planet)
        this.physics.world.on('overlap', (b1, b2) => {
            b1.stop()
            b2.stop()
        }
    )

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

        console.log(this.input.mousePointer)
        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
    },

    update(time, delta){
        controls.update(delta)
        ship.setAcceleration(20)
        ship.setVelocity(200,0)
    }
})

const UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function UIScene(){
        Phaser.Scene.call(this, {key: 'UIScene', active: true})
        this.materials = 0
    },
    create(){
        const info = this.add.text(10,10, 'Materials: 0', {font: '24px Arial', fill: '#FFFF00'})
        const game = this.scene.get('GameScene');
    }
})


let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            fps: 60,
            gravity: {y: 0}
        }
    },
    scene: [GameScene, UIScene]
};

let game = new Phaser.Game(config);
// let controls;
// let game = new Phaser.Game(config);

// function preload (){
//     this.load.image('ship', '../static/imgs/WhiteSide/ImmortalityClass.png')
//     this.load.image('fire', '../static/imgs/fire.png')
//     this.load.image('sky', '../static/imgs/space2.png');

//     this.load.image('terizan', '../static/imgs/Terizan.png')
// }

// let cursors;
// let ship;
// function create (){
//     this.add.image(2900, 300, 'sky');

//     planet = this.physics.add.staticImage(5422, 311, 'terizan')
//     ship = this.physics.add.image(400, 300, 'ship');
//     let particles = this.add.particles('fire');

//     let emitter = particles.createEmitter({
//         speed: 100,
//         scale: { start: 1, end: 0 },
//         blendMode: 'ADD'
//     });
//     ship.flipX = true
//     ship.setDrag(0.2)
//     ship.setMaxVelocity(200)
//     ship.setBounce(1, 1);
//     emitter.startFollow(ship);
//     this.cameras.main.setBounds(0,0,6000,1000)
    
//     this.physics.add.collider(ship, planet)
//     this.physics.world.on('overlap', (b1, b2) => {
//         b1.stop()
//         b2.stop()
//     })

//     let cursors = this.input.keyboard.createCursorKeys();

//     let controlConfig = {
//         camera: this.cameras.main,
//         right: cursors.right,
//         left: cursors.left,
//         up: null,
//         down: null,
//         zoomIn: null,
//         zoomOut: null,
//         minZoom: 0.001,
//         maxZoom: 1000,
//         acceleration: 1.0,
//         drag: 0.5,
//         maxSpeed: 1.0
//     }

//     console.log(this.input.mousePointer)
//     controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
// }

// function update(time, delta){
//     controls.update(delta)
//     ship.setAcceleration(20)
//     ship.setVelocity(200,0)
// }
