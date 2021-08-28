const lights = [
    {
        'name': 'paradox',
        'cost': 10,
    },
    {
        'name': 'destiny',
        'cost': 100,
    },
    {
        'name': 'divinity',
        'cost': 500,
    },
    {
        'name': 'endymion',
        'cost': 1000,
    },
    {
        'name': 'lux',
        'cost': 5000,
    },
    {
        'name': 'immortality',
        'cost': 10000,
    }
]
const darks = [
    {
        'name': 'raptor',
        'cost': 10
    },
    {
        'name': 'cerberus',
        'cost': 100
    },
    {
        'name': 'onyx',
        'cost': 500
    },
    {
        'name': 'heritage',
        'cost': 1000
    },
    {
        'name': 'devastator',
        'cost': 5000
    },
    {
        'name': 'pawn',
        'cost': 10000
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
    }
}

const Player = new User('dark')
const Enemy = new User('light')