class Sensors {
    constructor(car) {
        this.car = car;

        this.sensorCount = 3;
        this.sensorLength = 70;

        this.segments = [];
        this.segmentIntersection = [null, null, null];

        this.sensorInfo = [1000, 1000, 1000];

        this.roadPoly = null;

        this.angle = 0;
    }

    updateRoads(roadPoly) {
        this.roadPoly = roadPoly;
    }

    isDestroyed() {
        for (let i = 0; i < this.sensorInfo.length; i++) {
            if (this.sensorInfo[i] <= 1) {
                return true;
            } return false;
        }
    }

    getIntersectionPoint(ctx) {
        this.sensorInfo = [1000, 1000, 1000];

        for (let j = 0; j < this.sensorCount; j++) {
            const segment = this.segments[j];

            const n = this.roadPoly[0].points.length;

            for (let i = 0; i < n; i++) {
                const p1 = this.roadPoly[0].points[i];
                const p2 = this.roadPoly[0].points[(i + 1) % n];
                
                const int = getIntersection(segment.point1, segment.point2, p1, p2);
                if (int) {
                    this.segmentIntersection[j] = new Point(int.x, int.y, 3);
                    this.sensorInfo[j] = distance(new Point(this.car.x, this.car.y), this.segmentIntersection[j]);
                    
                    this.segmentIntersection[j].draw(ctx);
                    break;
                }
            }
        }
    }

    draw(ctx) {
        const newSegments = [];

        this.angle = this.car.angle - Math.PI / 2 - Math.PI / 6;

        for (let i = 0; i < this.sensorCount; i++) {
            const centerPoint = new Point(this.car.x, this.car.y);
            const newPoint = getOffsetPoint(centerPoint, this.sensorLength, this.angle + i * Math.PI / 6);

            newSegments.push(new Segment(centerPoint, newPoint, "yellow"));
        }

        this.segments = newSegments;
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].drawNormal(ctx);
        }

        this.getIntersectionPoint(ctx);
    }
}