/**
 * Represents a seed in the forest.
 * @param {Number} x               The x-coordinate to spawn the new seed.
 * @param {Number} y               The y-coordinate to spawn the new seed.
 * @param {Forest} forest          The forest in which this seed exists.
 */
function Seed(x, y, forest) {
    this.x = x;
    this.y = y;
    this.forest = forest;

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
        if (this.y < height) { // Seed is falling.
            this.y += 4;
        } else { // Seed hits the ground.
            this.sproutTree();
            this.forest.seeds.delete(this);
        }
    }
}