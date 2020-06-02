let forest;

// Sets up the canvas and forest scene.
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    forest = new Forest();
    tree = new Tree(width / 2, 220, forest);
    forest.addTree(tree);
}

// p5 function that draws the scene on every frame.
function draw() {
    background(0);
    forest.update();
    forest.show();
}

// Adds a new seed to the forest on mouse click.
var released = true;
function mousePressed() {
	if (released) {
		const seed = new Seed(mouseX, mouseY, forest, false);
        forest.addSeeds([seed]);
	}
	released = false;
}
// Work-around for touch screen double-clicking bug.
function mouseReleased() {
    released = true;
    return false;
}

// Resizes the canvas when the window is resized.
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    forest.updateTreePositions();
}