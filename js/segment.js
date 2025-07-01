class Segment {
    constructor(point1, point2, strokeStyle="white", lineWidth=3) {
        this.point1 = point1;
        this.point2 = point2;

        this.point1ID = this.point1.id;
        this.point2ID = this.point2.id;

        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    getLength() {
        return distance(this.point1, this.point2);
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.setLineDash([10, 16]);

        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);

        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();

        ctx.restore();
    }

    drawNormal(ctx) {
        ctx.beginPath();

        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);

        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }

    containsPoint(point) {
        return (this.point1.equalTo(point) || this.point2.equalTo(point));
    }
    
    equalTo(segment) {
        return ( segment.point1.equalTo(this.point1) && segment.point2.equalTo(this.point2) ) || ( segment.point1.equalTo(this.point2) && segment.point2.equalTo(this.point1) );
    }
}
