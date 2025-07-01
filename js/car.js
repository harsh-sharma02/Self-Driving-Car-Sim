class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;

        this.initialPosX = x;
        this.initialPosY = y;

        this.width = width;
        this.height = height;

        this.angle = 0;

        this.velocity = 0;
        this.acceleration = 0.25;

        this.drag = 0.05;

        this.score = 0;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.coordinates = getRotatedCoordinates(this.x, this.y, this.width, this.height);
    }

    addControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key == "ArrowUp") {
                this.moveForward = true;
            }
            if (e.key == "ArrowDown") {
                this.moveBackward = true;
            }
            if (e.key == "ArrowLeft") {
                this.moveLeft = true;
            }
            if (e.key == "ArrowRight") {
                this.moveRight = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == "ArrowUp") {
                this.moveForward = false;
            }
            if (e.key == "ArrowDown") {
                this.moveBackward = false;
            }
            if (e.key == "ArrowLeft") {
                this.moveLeft = false;
            }
            if (e.key == "ArrowRight") {
                this.moveRight = false;
            }
        });
    }

    networkData(output) {
        this.moveForward = output[0];
        this.moveBackward = output[1];
        this.moveLeft = output[2];
        this.moveRight = output[3];
    }

    handleControls() {
        this.x += Math.sin(this.angle) * this.velocity;
        this.y -= Math.cos(this.angle) * this.velocity;

        this.score = Math.max(
            this.score,
            distance(
                new Point(this.x, this.y),
                new Point(this.initialPosX, this.initialPosY)
            )
        );

        if (this.velocity < 1.5) {
            this.score = 0;
        }

        if (this.velocity >= 0) {
            this.velocity -= (this.velocity) * this.drag;
        }

        if (this.moveForward) {
            if (this.velocity < 4) {  
                this.velocity += this.acceleration;
            } else {
                this.velocity = 4;
            }
        }
        if (this.moveBackward) {
            if (this.velocity > 0) {  
                this.velocity -= this.acceleration;
            } else {
                this.velocity = 0;
            }
        }
        if (this.moveLeft) {
            this.angle -= Math.PI / 80;
        }
        if (this.moveRight) {
            this.angle += Math.PI / 80;
        }
    }

    draw(ctx) {
        this.coordinates = getRotatedCoordinates(this.x ,this.y, this.width, this.height, this.angle);
        this.handleControls();
        
        ctx.beginPath();
        ctx.moveTo(this.coordinates[0].x, this.coordinates[0].y);

        for (let i = 1; i < 4; i++) {
            ctx.lineTo(this.coordinates[i].x, this.coordinates[i].y);
        }

        ctx.fillStyle = "red";

        ctx.closePath();
        ctx.fill();
    }
}
