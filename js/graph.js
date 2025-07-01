class Graph {
    constructor(points, segments) {
        this.points = points;
        this.segments = segments;
    }

    draw(ctx) {
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            point.draw(ctx);
        }
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            segment.draw(ctx);
        }
    }
    
    addPoint(point) {
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            if (distance(point, p) < 34) return false;
        }
        this.points.push(point);
        return true;
    }
    addSegment(segment) {
        for (let i = 0; i < this.segments.length; i++) {
            const s = this.segments[i];
            if (segment.equalTo(s)) return false;
        }
        this.segments.push(segment);
        return true;
    }
}
