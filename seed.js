/**
 * Represents a seed in the forest.
 * @param {Number} x               The x-coordinate to spawn the new seed.
 * @param {Number} y               The y-coordinate to spawn the new seed.
 * @param {Number} germinationRate The chance of the seed sprouting.
 * @param {Forest} forest          The forest in which this seed exists.
 */
function Seed(x, y, germinationRate, forest) {
    this.x = x;
    this.y = y;
    this.germinationRate = germinationRate;
    this.forest = forest;

    /**
     * Sprouts a tree in the forest from this seed.
     */
    this.sproutTree = function() {
        if (this.x > 0 && this.x < width) {
            const treeHeight = Math.random() * 300;
            const newTree = new Tree(x, height, treeHeight, this.forest);
            this.forest.addTree(newTree);
        }
    }

    /**
     * Renders the seed.
     */
    this.show = function() {
        strokeWeight(5);
        stroke(255);
        point(this.x, this.y);
    }

    /**
     * Updates the seed over time.
     */
    this.update = function() {
        if (this.y < height) { // falling
            this.y += 4;
        } else { // seed hits the ground
            if (this.germinationRate > Math.random()) {
                this.sproutTree();
            }
            this.forest.seeds.delete(this);
        }
    }
}