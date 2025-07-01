function distance(point1, point2) {
    dis = (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
    return dis ** (0.5);
}

function nearestNode(currentPoint, graph) {
    let node = graph.points[0];
    let minDistance = distance(currentPoint, graph.points[0]);

    for (let i = 1; i < graph.points.length; i++) {
        const point = graph.points[i];
        let d = distance(currentPoint, point);

        if (d < minDistance) {
            minDistance = d;
            node = graph.points[i];
        }
    }

    return node;
}

function lastNodeDelete(graph) {
    const length = graph.points.length;

    if (length > 1) {
        const node = graph.points[length - 1]
        let i = graph.segments.length;
        while (i--) {
            const segment = graph.segments[i];
            if (segment.containsPoint(node)) {
                graph.segments.splice(i, 1);
            }
        }
        graph.points.splice(length - 1, 1);
    } else {
        return false;
    }
}

function getAngle(point1, point2) {
    return Math.atan2(point1.y - point2.y, point1.x - point2.x);
}

function getOffsetPoint(point, r, angle) {
    return new Point(point.x + r * Math.cos(angle), point.y + r * Math.sin(angle));
}

const SCALE = 1000;

function toClipperPath(polygon) {
  return polygon.points.map(p => ({
    X: Math.round(p.x * SCALE),
    Y: Math.round(p.y * SCALE)
  }));
}

function fromClipperPath(path) {
  return new Polygon(path.map(p => new Point(p.X / SCALE, p.Y / SCALE)));
}

function unionPolygons(polygons) {
  const clipper = new ClipperLib.Clipper();
  const allPaths = polygons.map(toClipperPath);

  clipper.AddPaths(allPaths, ClipperLib.PolyType.ptSubject, true);

  const solution = new ClipperLib.Paths();
  clipper.Execute(
    ClipperLib.ClipType.ctUnion,
    solution,
    ClipperLib.PolyFillType.pftNonZero,
    ClipperLib.PolyFillType.pftNonZero
  );

  return solution.map(fromClipperPath);
}

function getRotatedCoordinates(x, y, width, height, angle) {
    const rectCorners = [
        new Point(x - width / 2, y - height / 2),
        new Point(x + width / 2, y - height / 2),
        new Point(x + width / 2, y + height / 2),
        new Point(x - width / 2, y + height / 2)
    ];

    const rotatedCorners = [];

    for (let i = 0; i < rectCorners.length; i++) {
        const dx = rectCorners[i].x - x;
        const dy = rectCorners[i].y - y;

        const rotatedX = x + dx * Math.cos(angle) - dy * Math.sin(angle);
        const rotatedY = y + dx * Math.sin(angle) + dy * Math.cos(angle);
        
        rotatedCorners.push(new Point(rotatedX, rotatedY));
    }

    return rotatedCorners;
}

function lerp(p1, p2, t){
    return p1 + (p2 - p1) * t;
}

function getIntersection(p1,p2,p3,p4){ 
    const tTop = (p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x);
    const uTop = (p3.y-p1.y)*(p1.x-p2.x)-(p3.x-p1.x)*(p1.y-p2.y);

    const bottom = (p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);
    
    if (bottom != 0){
        const t = tTop / bottom;
        const u = uTop / bottom;
        
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(p1.x,p2.x,t),
                y:lerp(p1.y,p2.y,t),
                offset:t
            }
        }
    } return null;
}

function mutateNetwork(carsArray, networkData) {
    carsArray[0].network.layer.weights = networkData.weights;
    carsArray[0].network.layer.biases = networkData.biases;

    const k1 = networkData.weights.length;
    const k2 = networkData.weights[0].length;

    for (let i = 1; i < carsArray.length; i++) {
        const newWeights = [];
        const newBiases = [];
        
        for (let j = 0; j < k1; j++) {
            const w = [];
            for (let z = 0; z < k2; z++) {
                w.push(lerp(networkData.weights[j][z], Math.random() * 2 - 1, 0.05));
            }
            newWeights.push(w);
        }

        for (let j = 0; j < k1; j++) {
            newBiases.push(lerp(networkData.biases[j], Math.random() * 2 - 1, 0.05));
        }

        carsArray[i].network.layer.weights = newWeights;
        carsArray[i].network.layer.biases = newBiases;
    }
}
