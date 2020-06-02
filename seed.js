/**
 * Represents a seed in the forest.
 * @param {Number} x               The x-coordinate to spawn the new seed.
 * @param {Number} y               The y-coordinate to spawn the new seed.
 * @param {Forest} forest          The forest in which this seed exists.
 * @param {Boolean} isGrowing      Whether the seed is growing from a tree branch.
 */
function Seed(x, y, forest, isGrowing) {
    this.x = x;
    this.y = y;
    this.forest = forest;
    this.isGrowing = true;

    /**
     * Sprouts a tree in the forest from this seed.
     */
    this.sproutTree = function() {
        if (this.x > 0 && this.x < width) {
            const treeHeight = Math.random() * 300;
            const newTree = new Tree(x, treeHeight, this.forest);
            this.forest.addTree(newTree);
        }
    }

    let seedSize = 0;
    let maxSeedSize = 5;
    // Initializes the seed at its max size if it's not being grown from a tree.
    if (!isGrowing) {
        seedSize = maxSeedSize
    }
    
    /**
     * Renders the seed.
     */
    this.show = function() {
        strokeWeight(seedSize);
        stroke(255);
        point(this.x, this.y);
    }

    let germinationTime = 30;
    let fallingSpeed = 2;
    /**
     * Updates the seed over time.
     */
    this.update = function() {
        if (seedSize < maxSeedSize) { // Grows the seed before dropping.
            seedSize += 0.1;
        } else if (this.y < height - 2) { // Seed is falling.
            this.y += fallingSpeed;
            fallingSpeed += 0.05;
        } else if (germinationTime > 0) { // Seed hits the ground.
            this.y = height - 2;
            germinationTime -= 1;
        } else { // Seed sprouts.
            this.sproutTree();
            this.forest.seeds.delete(this);
        }
    }
}