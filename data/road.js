class Road {
    constructor(segment, roadWidth = 25) {
        this.point1 = segment.point1;
        this.point2 = segment.point2;

        this.roadWidth = roadWidth;
        this.alpha = getAngle(this.point1, this.point2);

        this.points = [];
        this.polygon = null;

        this.addPoints();
    }

    addPoints() {
        for (let angle = this.alpha + (Math.PI / 2); angle >= this.alpha - (Math.PI / 2); angle -= (Math.PI / 20)) {
            const newPoint = getOffsetPoint(this.point1, this.roadWidth, angle);
            this.points.push(newPoint);
        }
        for (let angle = this.alpha - (Math.PI / 2); angle >= this.alpha - (3 * Math.PI / 2); angle -= (Math.PI / 20)) {
            const newPoint = getOffsetPoint(this.point2, this.roadWidth, angle);
            this.points.push(newPoint);
        }
        this.polygon = new Polygon(this.points);
    }
}