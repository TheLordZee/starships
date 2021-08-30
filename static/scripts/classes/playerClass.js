const lights = [
    {
        'name': 'paradox',
        'cost': 10,
        'class': 'ship',
        'scale': 1
    },
    {
        'name': 'destiny',
        'cost': 100,
        'class': 'ship',
        'scale': 0.5
    },
    {
        'name': 'immortality',
        'cost': 500,
        'class': 'ship',
        'scale': 0.4
    }
]
const darks = [
    {
        'name': 'raptor',
        'cost': 10,
        'class': 'ship',
        'scale': 1
    },
    {
        'name': 'cerberus',
        'cost': 100,
        'class': 'ship',
        'scale': 0.5
    },
    {
        'name': 'pawn',
        'cost': 500,
        'class': 'ship',
        'scale': 0.4
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
    reset(){
        this.materials = 0;
        this.shots = [];
        this.currShips = [];
        this.miningShips = [];
    }
}

let Player;
let Enemy; 
