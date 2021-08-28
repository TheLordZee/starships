class User {
    constructor(side){
        this.side = side;
        this.materials = 0;
        this.planet;
        this.shots = [];
    }
}

const Player = new User('light')
const Enemy = new User('dark')