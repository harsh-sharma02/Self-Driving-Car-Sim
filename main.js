document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

runSimulationBtn = document.getElementById("runSimulationBtn");
lastNodeDeleteBtn = document.getElementById("lastNodeDeleteBtn");
saveDataBtn = document.getElementById("saveDataBtn");
enableEditBtn = document.getElementById("enableEditBtn");
disableEditBtn = document.getElementById("disableEditBtn");

savePlayerBtn = document.getElementById("savePlayerBtn");
newGenerationBtn = document.getElementById("newGenerationBtn");

let currentGen = 1;

currentlyEdit = true;

myCanvas = document.getElementById("myCanvas");

ctx = myCanvas.getContext("2d");

const savedGraphData = localStorage.getItem('roadData');

if (savedGraphData) {
    const data = JSON.parse(savedGraphData);

    const savedPoints = data.points;
    const savedSegments = data.segments;

    defaultPoints = [];
    pointsMap = {};

    for (let i = 0; i < savedPoints.length; i++) {
        const savedPoint = savedPoints[i];
        const newPoint = new Point(savedPoint.x, savedPoint.y, 15, savedPoint.id);

        pointsMap[newPoint.id] = newPoint;
        defaultPoints.push(newPoint);
    }

    defaultSegments = [new Segment(defaultPoints[0], defaultPoints[1])];

    for (let i = 1; i < savedSegments.length; i++) {
        const savedSegment = savedSegments[i];
        const newSegment = new Segment(pointsMap[savedSegment.point1ID], pointsMap[savedSegment.point2ID]);

        defaultSegments.push(newSegment);
    }
} else {
    defaultPoints = [new Point(350, 200), new Point(350, 500)];
    defaultSegments = [new Segment(defaultPoints[0], defaultPoints[1])];
}

graph = new Graph(defaultPoints, defaultSegments);

roadJunction = new RoadJunction();
graphEditor = new GraphEditor(myCanvas, graph);

playGround = new PlayGround();

savePlayerBtn.addEventListener("click", () => {
    playGround.saveBestPlayer();
});

newGenerationBtn.addEventListener("click", () => {
    currentGen += 1;
    document.getElementById("genNumber").innerText = currentGen;

    playGround.nextGeneration();
});

runSimulationBtn.addEventListener("click", () => {
    currentGen = 1;
    playGround.generateCars(100);
});

lastNodeDeleteBtn.addEventListener("click", () => {
    lastNodeDelete(graph);
    graphEditor.lastSelected = null;
});

enableEditBtn.addEventListener("click", () => {
    currentlyEdit = true;
    myCanvas.style.pointerEvents = "auto";
});

disableEditBtn.addEventListener("click", () => {
    currentlyEdit = false;
    myCanvas.style.pointerEvents = "none";
});

saveDataBtn.addEventListener("click", () => {
    const data = {
        points : graph.points,
        segments : graph.segments
    };
    localStorage.setItem('roadData', JSON.stringify(data));
});

animate();

function animate() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    roadJunction.updateRoads(graph);
    roadJunction.draw(ctx);

    if (currentlyEdit) {
        graphEditor.draw(ctx);
    } else {
        for (let i = 0; i < graph.segments.length; i++) {
            graph.segments[i].draw(ctx);
        }
    }

    playGround.drawCar(ctx, roadJunction);
    
    requestAnimationFrame(animate);
}
