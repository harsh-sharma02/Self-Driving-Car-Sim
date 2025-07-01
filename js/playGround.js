class PlayGround {
    constructor() {
        this.cars = [];
    }

    generateCars(n = 100) {
        this.cars = [];

        for (let i = 0; i < n; i++) {
            const carObj = {
                car : new Car(350, 350, 10, 20),
                network : new Network()
            }

            carObj.sensor = new Sensors(carObj.car);
            this.cars.push(carObj);
        }
    }

    saveBestPlayer() {
        if (this.cars.length > 0) {
            this.cars.sort((a, b) => a.car.score - b.car.score);

            const bestCar = this.cars[this.cars.length - 1];
            const networkData = {
                weights : bestCar.network.layer.weights,
                biases : bestCar.network.layer.biases
            };

            localStorage.setItem('bestPlayerData', JSON.stringify(networkData));
        }
    }

    nextGeneration() {
        const bestPlayerData = localStorage.getItem('bestPlayerData');

        if (bestPlayerData) {
            const networkData = JSON.parse(bestPlayerData);

            this.generateCars(50);

            mutateNetwork(this.cars, networkData);
        } 
    }

    drawCar(ctx, roadJunction) {
        if (this.cars.length > 0) {
            for (let i = this.cars.length - 1; i > -1; i = i - 1) {
                const carObj = this.cars[i];
                if (carObj.sensor.isDestroyed()){
                    this.cars.splice(i, 1);
                }
            }
        }

        if (this.cars.length > 0) {
            for (let i = 0; i < this.cars.length; i++) {
                const carObj = this.cars[i];

                carObj.sensor.updateRoads(roadJunction.fullPoly);
                carObj.sensor.draw(ctx);
            
                carObj.network.feedForward(carObj.sensor.sensorInfo);

                carObj.car.networkData(carObj.network.output);
                carObj.car.draw(ctx);
            }
        } else {
            return;
        }
    }
}
