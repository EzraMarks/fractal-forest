/**
 * Represents a phyical tree.
 * @param {Number} x      The x-coordinate of the tree's root.
 * @param {Number} trunkHeight The height of the tree's trunk, before branching.
 * @param {Forest} forest The forest in which this tree exists.
 */
function Tree(x, trunkHeight, forest) {
    this.x = x;
    this.trunkHeight = trunkHeight;
    this.forest = forest;
    // The recursion depth for creating new branches.
    this.depth = 3 + floor(trunkHeight / 70);
    // The percentage of life the tree has left.
    this.liveliness = 1;
    // 2D array of branches; each row contains all branches of a given depth.
    let tree;
    
    /**
     * Generates the tree by filling the `tree` array with Branches.
     */
    this.buildTree = function() {
        tree = []
        const rootBegin = createVector(this.x, height);
        const rootEnd = createVector(this.x, height - this.trunkHeight);
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
            if (rand < 0.005) {
                let seed = new Seed(spawnPoints[i].end.x, spawnPoints[i].end.y,
                                    this.forest, true);
                seeds.push(seed);
            }
        }
        return seeds;
    }

    /**
     * Updates the position of the tree, ensuring the root starts at the bottom
     * of the window.
     */
    this.updatePosition = function() {
        tree[0][0].begin.y = height;
        for (let i = 0; i < tree.length; i++) {
            const branches = tree[i];
            for (let j = 0; j < branches.length; j++) {
                branches[j].update();
            }
        }
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
    let seedTimer = Infinity;
    /**
     * Updates the state of the tree over time.
     */
    this.update = function() {
        // Grows the branches over time.
        if (growth < 1) {
            growth += 0.02 - growth / 70;
        }
        const branchDepth = growth * (tree.length - 1);
        if (tree[tree.length - 1][0].growth < 1) { // still growing
            for (let i = 0; i < tree.length; i++) {
                const branches = tree[i];
                for (let j = 0; j < branches.length; j++) {
                    if (i < branchDepth) {
                        branches[j].grow();
                    }
                    branches[j].update();
                }
            }
        }

        // Drops seeds with a frequency inversely proportional to the number of
        // trees in the forest.
        if (growth >= 1) {
            seedTimer += 1;
        }
        seedDropTime = (this.forest.trees.length ** 0.8) * 30;
        if (seedTimer > seedDropTime) {
            seedTimer = 0;
            this.forest.addSeeds(this.spawnSeeds());
        }

        // Deletes the tree when it runs out of life.
        if (this.liveliness <= 0) {
            this.forest.removeTree(this);
        }
    }

}