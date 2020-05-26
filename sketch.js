let forest;

function setup() {
    createCanvas(1000, 1000);
    forest = new Forest();

    tree1 = new Tree(width / 2, height - 5, 300, forest);
    forest.addTree(tree1);
    frameRate(60);
}

function draw() {
    background(0);
    forest.update();
    forest.show();
}