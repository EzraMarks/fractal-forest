/**
 * Represents a forest, containing all objects in the scene.
*/
function Forest() {
    // Array containing all Seeds in the Forest.
    this.seeds = [];
    // Array containng all Trees in the Forest.
    this.trees = [];
    // The current day of the year
    this.day = 200;

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
            this.seeds.push(newSeeds[i]);
        }
    }

    /**
     * Grows a single seed into a tree in the forest.
     * @param {Number} x The x-coordinate of the seed.
     */
    this.sproutSeed = function(x) {
        if (x > 0 && x < width) {
            const treeHeight = Math.random() * 300;
            const newTree = new Tree(x, height - 5, treeHeight, this);
            this.addTree(newTree);
        }
    }

    /**
     * Clears all seeds from the forest floor, with some lucky seeds
     * sprouting into trees.
     */
    this.sproutSeeds = function() {
        const randIdx = floor(Math.random() * (this.seeds.length - 1));
        if (Math.random() < 0.08) { // seed grows into tree
            this.sproutSeed(this.seeds[randIdx].x);
        }
        this.seeds.splice(randIdx, 1);
    }

    /**
     * Renders and updates all children elements in the forest.
     */
    this.show = function() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].update();
            this.trees[i].show();
            
        }
        for (let i = 0; i < this.seeds.length; i++) {
            this.seeds[i].update();
            this.seeds[i].show();
        }
    }

    let sproutSeeds = false;
    /**
     * Updates the state of the forest over time.
     */
    this.update = function() {
        // Repeats yearly.
        if (this.day > 365) {
            this.day = 0
        }
        this.day += 2;
        
        // October 15: spawns the seeds.
        if (this.day == 288) { 
            for (let i = 0; i < this.trees.length; i++) {
                this.addSeeds(this.trees[i].spawnSeeds());
            }
        }

        // Feb 1: sprouts the seeds.
        if (this.day == 32) {
            for (let i = 0; i < this.trees.length; i++) {
                sproutSeeds = true;
            }
        }
        if (sproutSeeds) {
            this.sproutSeeds();
            if (this.seeds.length == 0) {
                sproutSeeds = false;
            }
        }

        // Limits maximum number of trees.
        for (i = 0; i < this.trees.length; i++) {
            const reverseIdx = this.trees.length - 1 - i;
            const lifeReduction = ((reverseIdx / 10) ** 4) / 20;

            this.trees[i].liveliness -= lifeReduction;
        }
    }
}