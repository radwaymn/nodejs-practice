class Car {
    constructor(model, year) {
        this.model = model;
        this.year = year;
    }

    carData() {
        console.log(`Car model: ${this.model}, year: ${this.year}`)
    }
}

module.exports = Car;