class Point {
    constructor(x, y, radius = 15, id = Date.now()){
        this.x = x;
        this.y = y;

        this.id = id;

        this.radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.fillStyle = "black";
        ctx.fill();
    }

    equalTo(point) {
        return (point.x == this.x && point.y == this.y);
    }
}
