class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.lastSelected = null;
        this.currentPos = new Point(0, 0);

        this.dragging = false;
        this.currentDragNode = null;

        this.editFunction();
    }
    
    editFunction() {
        this.canvas.addEventListener("mousedown", (e) => {
            if (e.button == "0") {
                const mousePos = new Point(e.offsetX, e.offsetY);
                const node = nearestNode(mousePos, this.graph);

                if (distance(node, mousePos) < 34) {
                    this.dragging = true;
                    this.currentDragNode = node;
                }

                if (graph.addPoint(mousePos)) {
                    if (this.lastSelected != null) {
                        const newSegment = new Segment(this.lastSelected, mousePos);
                        this.graph.addSegment(newSegment);
                        this.lastSelected = mousePos;
                    } else {
                        this.lastSelected = mousePos;
                    }
                } else {
                    let newPoint = nearestNode(mousePos, this.graph);
                    if (this.lastSelected != null) {
                        const newSegment = new Segment(this.lastSelected, newPoint);
                        this.graph.addSegment(newSegment);
                        this.lastSelected = newPoint;
                    } else {
                        this.lastSelected = newPoint;
                    }
                }
            } 
            if (e.button == "2") {
                this.lastSelected = null;
            }
        });

        this.canvas.addEventListener("mouseup", () => {
            this.dragging = false;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            const mousePos = new Point(e.offsetX, e.offsetY);
            const node = nearestNode(mousePos, this.graph);

            if (distance(node, mousePos) < 34) {
                this.currentPos = node;
            } else {
                this.currentPos = mousePos;
            }

            if (this.dragging) {
                this.currentDragNode.x = mousePos.x;
                this.currentDragNode.y = mousePos.y;
            }
        });
    }

    draw(ctx) {
        this.graph.draw(ctx);

        if (this.lastSelected) {
            this.highlightPoint(this.lastSelected, ctx)
        }

        this.previewPoint(this.currentPos, ctx);
    }

    highlightPoint(lastSelected, ctx) {
        ctx.beginPath();
        ctx.arc(lastSelected.x, lastSelected.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    previewPoint(currentPos, ctx) {
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "orange";
        ctx.fill();
    }
}