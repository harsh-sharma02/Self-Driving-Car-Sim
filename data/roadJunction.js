class RoadJunction {
    constructor() {
        this.roads = [];
        this.fullPoly = null;
    }

    updateRoads(graph) {
        let updatedRoads = [];

        for (let i = 0; i < graph.segments.length; i++) {
            const road = new Road(graph.segments[i]);
            updatedRoads.push(road.polygon);
        }
        
        this.roads = updatedRoads;
        this.fullPoly = unionPolygons(this.roads);
    }

    draw(ctx) {
        for (let i = 0; i < this.fullPoly.length; i++) {
            this.fullPoly[i].draw(ctx);  
        }
    }
}