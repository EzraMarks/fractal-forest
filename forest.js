/**
 * A forest object to keep track of all elements in the scene.
*/
function Forest() {
    this.seeds = [];
    this.trees = [];
    this.day = 200;
    let sproutSeeds = false;

    /**
     * Add a tree to the forest.
     * @param {Tree} newTree The new tree to add to the forest.
     */
    this.addTree = function(newTree) {
        this.trees.push(newTree);
    }

    /**
     * Remove a tree from the forest.
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
     * Add a collection of seeds to the forest.
     * @param {Array[Seed]} newSeeds The new seeds to add to the forest.
     */
    this.addSeeds = function(newSeeds) {
        for (let i = 0; i < newSeeds.length; i++) {
            this.seeds.push(newSeeds[i]);
        }
    }

    /**
     * Grow a single seed into a tree in the forest.
     * @param {Number} x The x-coordinate of the seed.
     */
    this.sproutSeed = function(x) {
        if (x > 0 && x < width) {
            let treeHeight = Math.random() * height;
            let newTree = new Tree(x, height - 5, treeHeight, this);
            this.addTree(newTree);
        }
    }

    /**
     * Clear all seeds from the forest floor, with some lucky seeds
     * sprouting into trees.
     */
    this.sproutSeeds = function() {
        randIdx = floor(Math.random() * (this.seeds.length - 1));
        if (Math.random() < 0.05) { // seed grows into tree
            this.sproutSeed(this.seeds[randIdx].x);
        }
        this.seeds.splice(randIdx, 1);
    }

    /**
     * Render and update all children elements in the forest.
     */
    this.show = function() {
        for (let i = 0; i < this.trees.length; i++) {
            theTree = this.trees[i];
            theTree.update();
            theTree.show();
            
        }
        for (let i = 0; i < this.seeds.length; i++) {
            this.seeds[i].update();
            this.seeds[i].show();
        }
    }

    /**
     * Update the state of the forest.
     */
    this.update = function() {
        // Repeat yearly.
        if (this.day > 365) {
            this.day = 0
        }
        this.day += 1;
        
        // October 15: spawn the seeds.
        if (this.day == 288) { 
            for (let i = 0; i < this.trees.length; i++) {
                this.addSeeds(this.trees[i].spawnSeeds());
            }
        }

        // Feb 1: sprout the seeds.
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

        // Limit maximum number of trees.
        if (this.trees.length > 20) {
            this.trees.shift();
        }
    }
}