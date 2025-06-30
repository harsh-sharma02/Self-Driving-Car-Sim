class Polygon {
    constructor(points) {
        this.points = points;
    }

    draw(ctx) {
        ctx.beginPath();

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            ctx.lineTo(point.x, point.y);
        }

        ctx.fillStyle = "#87898c";
        ctx.strokeStyle = "#d2d2d4";

        ctx.lineWidth = 6;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
