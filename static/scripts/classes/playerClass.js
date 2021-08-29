const lights = [
    {
        'name': 'paradox',
        'cost': 10,
        'class': 'ship'
    },
    {
        'name': 'destiny',
        'cost': 100,
        'class': 'ship'
    },
    {
        'name': 'divinity',
        'cost': 500,
        'class': 'ship'
    },
    {
        'name': 'endymion',
        'cost': 1000,
        'class': 'ship'
    },
    {
        'name': 'lux',
        'cost': 5000,
        'class': 'ship'
    },
    {
        'name': 'immortality',
        'cost': 10000,
        'class': 'ship'
    }
]
const darks = [
    {
        'name': 'raptor',
        'cost': 10,
        'class': 'ship'
    },
    {
        'name': 'cerberus',
        'cost': 100,
        'class': 'ship'
    },
    {
        'name': 'onyx',
        'cost': 500,
        'class': 'ship'
    },
    {
        'name': 'heritage',
        'cost': 1000,
        'class': 'ship'
    },
    {
        'name': 'devastator',
        'cost': 5000,
        'class': 'ship'
    },
    {
        'name': 'pawn',
        'cost': 10000,
        'class': 'ship'
    }
]

class User {
    constructor(side){
        this.side = side;
        this.materials = 0;
        this.planet;
        this.shots = [];
        if(side === 'light'){
            this.ships = lights;
        } else {
            this.ships = darks;
        }
        this.belt;
        this.currShips = [];
        this.miningShips = [];
    }
}

const Player = new User('dark')
const Enemy = new User('light')

Enemy.ships.push(Enemy.side === 'light' ? {'name':'cherub', 'cost': 10, 'class': 'miner'} : {'name':'star', 'cost': 10, 'class': 'miner'})