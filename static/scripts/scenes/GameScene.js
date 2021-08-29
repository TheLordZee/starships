const toRender = [];
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

        const newEnemy  = this.time.addEvent({
            delay: 1000,
            callback: ()=> {
                this.spawnEnemy()
            },
            loop: true
        })   
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
        if(isPlayer){
            Player.miningShips.push(miner)
        }else{
            Enemy.miningShips.push(miner)
        }
        return miner
    },
    createShip(shipName, isPlayer){
        let ship;
        let x
        let y =  Phaser.Math.Between(50,500)
        if(isPlayer){
            x = 400
        } else {
            x = 5100
        }
        switch(shipName){
            case 'immortality':
                ship = new Immortalty(this, x, y, isPlayer)
                break;
            case 'destiny':
                ship = new Destiny(this, x, y, isPlayer)
                break;
            case 'paradox':
                ship = new Paradox(this, x, y, isPlayer)
                break;
            case 'diviniy':
                ship = new Diviniy(this, x, y, isPlayer)
                break;
            case 'endymion':
                ship = new Endymion(this, x, y, isPlayer)
                break;
            case 'lux':
                ship = new Lux(this, x, y, isPlayer)
                break;
            case 'pawn':
                ship = new Pawn(this, x, y, isPlayer)
                break;
            case 'cerberus':
                ship = new Cerberus(this, x, y, isPlayer)
                break;
            case 'devastator':
                ship = new Devastator(this, x, y, isPlayer)
                break;
            case 'heritage':
                ship = new Heritage(this, x, y, isPlayer)
                break;
            case 'onyx':
                ship = new Onyx(this, x, y, isPlayer)
                break;
            case 'raptor':
                ship = new Raptor(this, x, y, isPlayer)
                break;
            default:
                console.log(`${shipName} class hasn't been made yet`)
        }
        let ships;
        if(isPlayer){
            ship.ship.flipX = true
            this.physics.add.collider(ship.detector, Enemy.planet, (s, planet) => {
                this.enemyDetection(s, planet)
            })
            Player.currShips.push(ship)
            ships = Enemy.currShips
        }else{
            this.physics.add.collider(ship.detector, Player.planet, (s, planet) => {
                this.enemyDetection(s, planet)   
            })
            Enemy.currShips.push(ship)
            ships = Player.currShips
        }
        for(let s of ships){
            if(s.type !== 'miner'){
                this.physics.add.collider(ship.detector, s.ship, (col, ship)=>{ this.enemyDetection(col, ship) })
                this.physics.add.collider(s.detector, ship.ship, (col, ship)=>{ this.enemyDetection(col, ship) })
            }
        }

        let enemyShots
        if(isPlayer){
            enemyShots = Enemy.shots
        } else {
            enemyShots = Player.shots
        }
        for(let shot in enemyShots){
            this.physics.add.collider(shot, ship, (laser, ship) => {
                ship.health -= this.damage
                if(ship.health <= 0){
                    ship.destroy()
                }
                laser.destroy()
            })
        }
        
        return ship
    },
    spawnEnemy(){
        let ship = Phaser.Math.RND.pick(Enemy.ships)
        let enemy;
        if(Enemy.materials >= ship['cost']){
            if(ship['class'] === 'ship'){
                enemy = this.createShip(ship['name'], false);
            }else{
                switch(Enemy.side){
                    case 'light':
                        enemy = this.createMiner('cherub', false)
                        Enemy.miningShips.push(enemy)
                        break;
                    case 'dark':
                        enemy = this.createMiner('star', false)
                        Enemy.miningShips.push(enemy)
                        break;
                    default:
                        throw(`Error: ${Enemy.side} is not a valid side`)
                }
            }
            Enemy.materials -= ship['cost']
        }
        return enemy;
    },
    update(time, delta){
        controls.update(delta)
        Player.planet.setValue(Player.planet.healthBar, (Player.planet.health/Player.planet.maxHealth) * 100);
        Enemy.planet.setValue(Enemy.planet.healthBar, (Enemy.planet.health/Enemy.planet.maxHealth) * 100);
        
        for(let ship of Player.currShips){
            try{
            if(ship.ship.hasTarget){
                ship.body.acceleration = 0
                ship.body.velocity['x'] = 0
            } else {
                ship.body.acceleration = ship.ship.acceleration
                ship.body.velocity['x'] = ship.ship.speed
            }
            }catch(e){
                console.log(Player.currShips)
            }
        }
        for(let ship of Player.miningShips){
            ship.body.acceleration = ship.acceleration
            ship.body.velocity['x'] = ship.speed
        }
        for(let ship of Enemy.currShips){
            try{
                if(ship.ship.hasTarget){
                    ship.body.acceleration = 0
                    ship.body.velocity['x'] = 0
                }else{
                    ship.body.acceleration = ship.ship.acceleration
                    ship.body.velocity['x'] = ship.ship.speed
                }
            }catch(e){
                console.log(Enemy.currShips)
            }
        }
        for(let ship of Enemy.miningShips){
            ship.body.acceleration = ship.acceleration
            ship.body.velocity['x'] = ship.speed
        }
        
    }
})