let forest;

function setup() { //TODO re=run setup when page size changes
    createCanvas(window.innerWidth, window.innerHeight);
    forest = new Forest();

    tree1 = new Tree(width / 2, height, 220, forest);
    forest.addTree(tree1);
    frameRate(60);
}

function draw() {
    background(0);
    forest.update();
    forest.show();
}
    
function mousePressed() {
    const seed = new Seed(mouseX, mouseY, 1, forest);
    forest.addSeeds([seed]);
}