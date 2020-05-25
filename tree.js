/**
 * Represents a phyical tree.
 * @param {Number} x      The x-coordinate of the tree's root.
 * @param {Number} y      The y-coordinate of the tree's root.
 * @param {Number} height The height of the tree's trunk, before branching.
 * @param {Forest} forest The forest in which this tree exists.
 */
function Tree(x, y, height, forest) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.forest = forest;
    // The recursion depth for creating new branches.
    this.depth = 5 + floor(height / 50);
    // The percentage of life the tree has left.
    this.liveliness = 1;
    // 2D array of branches; each row contains all branches of a given depth.
    let tree;
    
    /**
     * Generates the tree by filling the `tree` array with Branches.
     */
    this.buildTree = function() {
        tree = []
        const rootBegin = createVector(this.x, this.y);
        const rootEnd = createVector(this.x, this.y - this.height);
        const root = new Branch (rootBegin, rootEnd, 0, this);
        tree.push([root]);

        for (let i = 0; i < this.depth; i++) {
            const branches = tree[i];
            tree.push([]);
            for (let j = 0; j < branches.length; j++) {
                const children = branches[j].branch();
                tree[i + 1].push(children[0]);
                tree[i + 1].push(children[1]);
            }
        }
    }
    this.buildTree();

    /**
     * Returns an array of new Seeds located at the tree's outer leaves.
     * @returns {Array[Seeds]} An array of Seeds.
     */
    this.spawnSeeds = function() {
        const spawnPoints = tree[tree.length - 1];
        const seeds = [];
        
        for (let i = 0; i < spawnPoints.length; i++) {
            rand = Math.random();
            if (rand < 0.1) {
                let seed = new Seed(spawnPoints[i].end.x, spawnPoints[i].end.y);
                seeds.push(seed);
            }
        }
        return seeds;
    }
    
    /**
     * Renders all branches in the tree.
     */
    this.show = function() {
        for (let i = 0; i < tree.length; i++) {
            const branches = tree[i];
            for (let j = 0; j < branches.length; j++) {
                branches[j].show();
            }
        }
    }

    let growth = 0;
    /**
     * Updates the state of the tree over time.
     */
    this.update = function() {
        growth += 0.1;
        if (growth <= tree.length) { // still growing
            for (let i = 0; i < tree.length; i++) {
                const branches = tree[i];
                for (let j = 0; j < branches.length; j++) {
                    if (i < growth) {
                        branches[j].grow();
                    }
                    branches[j].update();
                }
            }
        }

        // Deletes the tree when it runs out of life.
        if (this.liveliness <= 0) {
            this.forest.removeTree(this);
        }
    }

}