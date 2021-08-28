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
        this.load.image('star', '../static/imgs/DarkSide/star.png')
        this.load.image('starwrock', '../static/imgs/DarkSide/starwrock.png')
        this.load.image('cherub', '../static/imgs/WhiteSide/cherub.png')
        this.load.image('cherubwrock', '../static/imgs/WhiteSide/cherubwrock.png')
        
        this.load.image('immortality', '../static/imgs/WhiteSide/ImmortalityClass.png')
        this.load.image('destiny', '../static/imgs/WhiteSide/DestinyClass.png')
        this.load.image('divinity', '../static/imgs/WhiteSide/DivinityClass.png')
        this.load.image('endymion', '../static/imgs/WhiteSide/EndymionClass.png')
        this.load.image('paradox', '../static/imgs/WhiteSide/ParadoxClass.png')
        this.load.image('lux', '../static/imgs/WhiteSide/LuxClass.png')

        this.load.image('pawn', '../static/imgs/DarkSide/PawnClass.png')
        this.load.image('cerberus', '../static/imgs/DarkSide/CerberusClass.png')
        this.load.image('devastator', '../static/imgs/DarkSide/DevastatorClass.png')
        this.load.image('heritage', '../static/imgs/DarkSide/HeritageClass.png')
        this.load.image('onyx', '../static/imgs/DarkSide/OnyxClass.png')
        this.load.image('raptor', '../static/imgs/DarkSide/RaptorClass.png')

        this.load.image('detector', '../static/imgs/detector.png')
        this.load.image('fire', '../static/imgs/fire.png')
        this.load.image('sky', '../static/imgs/space2.png');
        
        this.load.image('terizan', '../static/imgs/Terizan.png')
        this.load.image('korida', '../static/imgs/Korida.png')
        
        this.load.image('laser', '../static/imgs/laserbeam.png')
        this.load.image('blueLaser', '../static/imgs/WhiteSide/laserbeam.png')
        this.load.image('redLaser', '../static/imgs/DarkSide/laserbeam.png')
    },
    create(){
        this.add.image(2900, 300, 'sky');
        Player.planet = new Planet(this, 'korida', true)
        Enemy.planet = new Planet(this, 'terizan', false)
        
        this.cameras.main.setBounds(0,0,6000,1000)

        Player.belt = this.physics.add.image(1200, 300, 'detector')
        Player.belt.body.setSize(300, 1200, 1)
        Player.belt.setImmovable()
        Enemy.belt = this.physics.add.image(4500, 300, 'detector')
        Enemy.belt.body.setSize(300, 1200, 1)  
        Enemy.belt.setImmovable()

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
        detector.parentContainer.ship.shoot(this, ship)
    },
    createMiner(shipname, isPlayer){
        let miner;
        let x
        let y =  Phaser.Math.Between(50,500)
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipname){
            case 'cherub':
                miner = new Miner(this, x, y, 'cherub', 'cherubwrock', 'light', isPlayer)
                break;
            case 'star':
                miner = new Miner(this, x, y, 'star', 'starwrock', 'dark', isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been added yet`)
                break;
        }
        this.physics.add.collider(miner, isPlayer ?  Player.belt : Enemy.belt, (ship, belt) => {
            ship.getRock()
        })
        this.physics.add.collider(miner, isPlayer ?  Player.planet : Enemy.planet, (ship, planet) => {
            ship.addMaterials()
        })
        let enemyShots;
        if(isPlayer){
            miner.flipX = true
            enemyShots = Enemy.shots;
        } else {
            enemyShots = Player.shots;
        }

        for(let shot in enemyShots){
            this.physics.add.collider(shot, miner, (laser, ship) => {
                ship.health -= this.damage
                if(ship.health <= 0){
                    ship.destroy()
                }
                laser.destroy()
            })
        }
        if(miner.sides === 'light'){
            lightShips.push(miner)
        }else{
            darkShips.push(miner)
        }
    },
    createLightShip(shipName, isPlayer){
        let light;
        let x
        let y =  Phaser.Math.Between(50,500)
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipName){
            case 'immortality':
                light = new Immortalty(this, x, y, isPlayer)
                break;
            case 'destiny':
                light = new Destiny(this, x, y, isPlayer)
                break;
            case 'paradox':
                light = new Paradox(this, x, y, isPlayer)
                break;
            case 'diviniy':
                light = new Diviniy(this, x, y, isPlayer)
                break;
            case 'endymion':
                light = new Endymion(this, x, y, isPlayer)
                break;
            case 'lux':
                light = new Lux(this, x, y, isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }
        if(Player.side === 'light'){
            light.ship.flipX = true
        }
        
        if(Player.side === 'light'){
            this.physics.add.collider(light.detector, Enemy.planet, (light, planet) => {
                this.enemyDetection(light, planet)   
            })
        }else{
            this.physics.add.collider(light.detector, Player.planet, (light, planet) => {
                this.enemyDetection(light, planet)   
            })
        }

        lightShips.push(light)

        for(let dark of darkShips){
            this.physics.add.collider(light, dark, (light, dark) => {
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
        console.log(light)
        return light
    },
    createDarkShip(shipName, isPlayer){
        let dark
        let y = Phaser.Math.Between(50,500)
        let x
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipName){
            case 'pawn':
                dark = new Pawn(this, x, y, isPlayer)
                break;
            case 'cerberus':
                dark = new Cerberus(this, x, y, isPlayer)
                break;
            case 'devastator':
                dark = new Devastator(this, x, y, isPlayer)
                break;
            case 'heritage':
                dark = new Heritage(this, x, y, isPlayer)
                break;
            case 'onyx':
                dark = new Onyx(this, x, y, isPlayer)
                break;
            case 'raptor':
                dark = new Raptor(this, x, y, isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }      
        if(Player.side === 'dark'){
            dark.ship.flipX = true
            this.physics.add.collider(dark.detector, Enemy.planet, (d, planet) => {
                this.enemyDetection(d, planet)   
            })
        }else{
            this.physics.add.collider(dark.detector, Player.planet, (d, planet) => {
                this.enemyDetection(d, planet)   
            })
        }

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

        dark.on('overlapend', () => {
            console.log(dark)
        })

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
        console.log(dark)
        return dark
    },
    update(time, delta){
        controls.update(delta)
        Player.planet.setValue(Player.planet.healthBar, (Player.planet.health/Player.planet.maxHealth) * 100);
        Enemy.planet.setValue(Enemy.planet.healthBar, (Enemy.planet.health/Enemy.planet.maxHealth) * 100);
        
        for(let ship in lightShips){
            if(ship.type !== 'miner'){
                if(ship.moving && !ship.ship.hasTarget){
                    ship.body.acceleration = ship.ship.acceleration
                    ship.body.velocity['x'] = ship.ship.speed
                }
                if(ship.ship.hasTarget){
                    ship.body.acceleration = 0
                    ship.body.velocity['x'] = 0
                }
            }else{
                ship.body.acceleration = ship.acceleration
                ship.body.velocity['x'] = ship.speed
            }
        }
        for(let ship of darkShips){
            if(ship.type === 'miner'){
                ship.body.acceleration = ship.acceleration
                ship.body.velocity['x'] = ship.speed
            }else{
                if(ship.moving && !ship.ship.hasTarget){
                    ship.body.acceleration = ship.ship.acceleration
                    ship.body.velocity['x'] = ship.ship.speed
                }
                if(ship.ship.hasTarget){
                    ship.body.acceleration = 0
                    ship.body.velocity['x'] = 0
                }
            }
        }
    }
})