class Layer {
    constructor(neuronCount, previousLayer) {
        this.neuronCount = neuronCount;
        this.previousLayer = previousLayer;

        this.weights = [];
        this.biases = [];
        
        this.randomiseLayer();
    }

    randomiseLayer() {
        for (let i = 0; i < this.neuronCount; i++) {
            const newWeights = [];
            for (let j = 0; j < this.previousLayer; j++) {
                newWeights.push(Math.random() * 2 - 1);
            }

            this.weights.push(newWeights);
        }

        for (let i = 0; i < this.neuronCount; i++) {
            this.biases.push(Math.random() * 2 - 1);
        }
    }
}

class Network {
    constructor(network = null) {
        this.layer = new Layer(4, 3);

        if (network) {
            this.layer = network.layer;

            for (let i = 0; i < this.layer.neuronCount; i++) {
                let newWeights = [];
                for (let j = 0; j < this.layer.previousLayer; j++) {
                    newWeights.push(this.layer.weights[i][j] + Math.random() * (this.layer.weights[i][j] / 7) - this.layer.weights[i][j] / 5);
                }

                this.layer.weights[i] = newWeights;
            }

            for (let i = 0; i < this.layer.neuronCount; i++) {
                this.layer.biases[i] += Math.random() * (this.layer.biases[i] / 15) - this.layer.biases[i] / 5;
            }
        } else {
            this.layer.randomiseLayer();
        }

        this.output = [];
    }

    feedForward(input) {
        for (let i = 0; i < this.layer.neuronCount; i++) {
            let sum = 0;
            for (let j = 0; j < input.length; j++) {
                sum += this.layer.weights[i][j] * (input[j] / 10);   
            }
            
            if (sum >= this.layer.biases[i]) {
                this.output[i] = 1;
            } else {
                this.output[i] = 0;
            }
        }
    }
}
