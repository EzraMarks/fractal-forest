/**
 * Represents a forest, containing all objects in the scene.
*/
function Forest() {
    // Set containing all Seeds in the Forest.
    this.seeds = new Set();
    // Array containng all Trees in the Forest.
    this.trees = [];

    /**
     * Adds a tree to the forest.
     * @param {Tree} newTree The new tree to add to the forest.
     */
    this.addTree = function(newTree) {
        this.trees.push(newTree);
    }

    /**
     * Removes a tree from the forest.
     * @param {Tree} oldTree The old tree to remove from the forest.
     */
    this.removeTree = function(oldTree) {
        // Inefficient data structure, but won't impact performance.
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i] == oldTree) {
                this.trees.splice(i, 1);
            }
        }
    }

    /**
     * Adds a collection of seeds to the forest.
     * @param {Array[Seed]} newSeeds The new seeds to add to the forest.
     */
    this.addSeeds = function(newSeeds) {
        for (let i = 0; i < newSeeds.length; i++) {
            this.seeds.add(newSeeds[i]);
        }
    }

    /**
     * Updates the positions of the trees, ensuring each tree's root starts at
     * the bottom of the window.
     */
    this.updateTreePositions = function() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].updatePosition();
        }
    }

    /**
     * Renders and updates all children elements in the forest.
     */
    this.show = function() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].update();
            this.trees[i].show();
            
        }
        for (let seed of this.seeds.keys()) {
            seed.update();
            seed.show();
        }
    }

    /**
     * Updates the state of the forest over time.
     */
    this.update = function() {
        // Limits maximum number of trees.
        for (i = 0; i < this.trees.length; i++) {
            const reverseIdx = this.trees.length - 1 - i;
            const lifeReduction = ((reverseIdx / 15) ** 2) / 200;

            this.trees[i].liveliness -= lifeReduction;
        }
    }
}