let forest;

function setup() {
    createCanvas(400, 400);
    forest = new Forest();

    tree1 = new Tree(200, 400, 100, 9);
    tree1.buildTree();
    forest.addTree(tree1);

    tree2 = new Tree(100, 400, 30, 7);
    tree2.buildTree();
    forest.addTree(tree2);
}

function mousePressed() {
    seeds = tree1.spawnSeeds();
    forest.addSeeds(seeds);
}

function draw() {
    background(51);
    forest.show();
}