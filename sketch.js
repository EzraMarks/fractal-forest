let forest;

function setup() {
    createCanvas(1000, 1000);
    forest = new Forest();

    tree1 = new Tree(width / 2, height - 5, 200, forest);
    forest.addTree(tree1);
}

function draw() {
    background(51);
    forest.update();
    forest.show();
}