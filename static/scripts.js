let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let controls;
let game = new Phaser.Game(config);

function preload (){
    this.load.image('ship', '../static/imgs/Nova-Class.png')
    this.load.image('fire', '../static/imgs/fire.png')
    // this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', '../static/imgs/space2.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
}

let cursors;

function create (){
    this.add.image(1900, 300, 'sky');

    let particles = this.add.particles('fire');

    let emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    let logo = this.add.image(400, 300, 'ship');

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    console.log(logo)

    emitter.startFollow(logo);
    
    // this.matter.world.setBounds(0,0,4000,1000)
    this.cameras.main.setBounds(0,0,4000,1000)
 
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
}

function update(time, delta){
    controls.update(delta)
}
