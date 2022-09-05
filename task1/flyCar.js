const Car = require('./car');

class FlyCar extends Car {
    constructor(model, year) {
        super(model, year);
        this.canFly = true;
    }

    carData() {
        super.carData();
        console.log('I can fly');
    }
}

exports.FlyCar = FlyCar;