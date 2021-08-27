class User {
    constructor(side, planet){
        this.side = side
        this.materials = 0
        this.planet = planet
    }
}

const Player = new User('light')
const Enemy = new User('dark')