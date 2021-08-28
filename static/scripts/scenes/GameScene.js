const toRender = [];
const lightShips = [];
const darkShips = [];
const GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameScene(){
        let controls;
        let cursors; 
        Phaser.Scene.call(this, {key: 'GameScene'});    
    },

    preload(){
        this.load.image('detector', '../static/imgs/detector.png')
        this.load.image('ship', '../static/imgs/WhiteSide/ImmortalityClass.png')
        this.load.image('fire', '../static/imgs/fire.png')
        this.load.image('sky', '../static/imgs/space2.png');
        this.load.image('destiny', '../static/imgs/WhiteSide/DestinyClass.png')
        this.load.image('terizan', '../static/imgs/Terizan.png')
        this.load.image('korida', '../static/imgs/Korida.png')
        this.load.image('pawn', '../static/imgs/DarkSide/PawnClass.png')
        this.load.image('laser', '../static/imgs/laserbeam.png')
        this.load.image('blueLaser', '../static/imgs/WhiteSide/laserbeam.png')
        this.load.image('redLaser', '../static/imgs/DarkSide/laserbeam.png')
    },
    create(){
        this.add.image(2900, 300, 'sky');

        Player.planet = this.physics.add.staticImage(300, 311, 'korida') 
        Enemy.planet = this.physics.add.staticImage(5422, 311, 'terizan')
        this.cameras.main.setBounds(0,0,6000,1000)

        let i = this.createLightShip('immortality', true)
        this.createDarkShip('pawn', false)

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
    enemyDetection(detector, ship){
        detector.parentContainer.moving = false
        detector.parentContainer.body.velocity['x'] = 0
        detector.parentContainer.ship.shoot(this, ship)
    },
    createLightShip(shipName, isPlayer){
        let light;
        let x
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipName){
            case 'immortality':
                light = new Immortalty(this, x, Phaser.Math.Between(50,500), isPlayer)
                break;
            case 'destiny':
                light = new Destiny(this, x, Phaser.Math.Between(50,550), isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }
        light.ship.flipX = true
        
        this.physics.add.collider(light.ship, Enemy.planet, (light, planet) => {
            light.parentContainer.moving = false
            light.parentContainer.body.velocity['x'] = 0
        })

        lightShips.push(light)

        for(let dark of darkShips){
            this.physics.add.collider(light.ship, dark.ship, (ship, dark) => {
                light.ship.moving = false
                dark.ship.moving = false
                light.parentContainer.body.velocity['x'] = 0
                dark.parentContainer.body.velocity['x'] = 0
            })

            this.physics.add.collider(light.detector, dark.ship, (col, ship)=>{ this.enemyDetection(col, ship) })

            this.physics.add.collider(dark.detector, light.ship, (col, ship)=>{ this.enemyDetection(col, ship) })
        }
        let enemyShots
        if(isPlayer){
            enemyShots = Enemy.shots
        } else {
            enemyShots = Player.shots
        }
        for(let shot in enemyShots){
            this.physics.add.collider(shot, light, (laser, ship) => {
                ship.health -= this.damage
                if(ship.health <= 0){
                    ship.destroy()
                }
                laser.destroy()
            })
        }
        return light
    },
    createDarkShip(shipName, isPlayer){
        let dark
        let x
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipName){
            case 'pawn':
                dark = new Pawn(this, x, Phaser.Math.Between(50,550), isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }
        this.physics.add.collider(dark.ship, Player.planet, (dark, planet) => {
            dark.parentContainer.moving = false
            dark.parentContainer.body.velocity['x'] = 0
        })

        for(let light of lightShips){
            this.physics.add.collider(light.ship, dark.ship, (light, dark) => {
                light.parentContainer.moving = false
                dark.parentContainer.moving = false
                light.parentContainer.body.velocity['x'] = 0
                dark.parentContainer.body.velocity['x'] = 0
            })

            this.physics.add.collider(dark.detector, light.ship, (col, dark)=>{ this.enemyDetection(col, dark) })

            this.physics.add.collider(light.detector, dark.ship, (col, dark)=>{ this.enemyDetection(col, dark) })
        }
        darkShips.push(dark)
        let enemyShots
        if(isPlayer){
            enemyShots = Enemy.shots
        } else {
            enemyShots = Player.shots
        }
        for(let shot in enemyShots){
            this.physics.add.collider(shot, dark, (laser, ship) => {
                ship.health -= this.damage
                if(ship.health <= 0){
                    ship.destroy()
                }
                laser.destroy()
            })
        }
        return dark
    },
    update(time, delta){
        controls.update(delta)
        // console.log(ships)
        
        for(key in Object.keys(lightShips)){
            if(lightShips[key].moving){
                lightShips[key].body.acceleration = lightShips[key].ship.acceleration
                lightShips[key].body.velocity['x'] = lightShips[key].ship.speed
            }
        }
        for(key in Object.keys(darkShips)){
            if(darkShips[key].moving){
                darkShips[key].body.acceleration = darkShips[key].ship.acceleration
                darkShips[key].body.velocity['x'] = -darkShips[key].ship.speed
            }
        }

        // for(let key in Object.keys(Player.shots)){
        //     // console.log(Player.shots[key])
        //     Player.shots[key].setVelocity(400,0)
        //     Player.shots[key].setAcceleration(40, 0)
        // }
    }
})