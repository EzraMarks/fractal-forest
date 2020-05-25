function Tree(x, y, height, forest) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.forest = forest;
    this.depth = 4 + floor(height / 40);
    
    // 2D array of branches; each row contains all branches of a given depth
    let tree;
    
    this.buildTree = function() {
        tree = []
        let rootBegin = createVector(this.x, this.y);
        let rootEnd = createVector(this.x, this.y - this.height);
        let root = new Branch (rootBegin, rootEnd);
        tree.push([root]);

        for (let i = 0; i < this.depth; i++) {
            let branches = tree[i];
            tree.push([]);
            for (let j = 0; j < branches.length; j++) {
                const children = branches[j].branch();
                tree[i + 1].push(children[0]);
                tree[i + 1].push(children[1]);
            }
        }
    }
    this.buildTree();

    this.spawnSeeds = function() {
        let spawnPoints = tree[tree.length - 1];
        let seeds = [];
        
        for (let i = 0; i < spawnPoints.length; i++) {
            rand = Math.random();
            if (rand < 0.1) {
                let seed = new Seed(spawnPoints[i].end.x, spawnPoints[i].end.y);
                seeds.push(seed);
            }
        }
        return seeds;
    }
    
    this.show = function() {
        for (let i = 0; i < tree.length; i++) {
            const branches = tree[i];
            for (let j = 0; j < branches.length; j++) {
                branches[j].show();
            }
        }
    }

    let growth = 0;
    this.grow = function() {
        if (growth < tree.length) {
            growth += 0.1;
        }
        for (let i = 0; i < tree.length; i++) {
            const branches = tree[i];
            for (let j = 0; j < branches.length; j++) {
                branches[j].update();
                if (i < growth) {
                    branches[j].grow();
                }
            }
        }
    }

    let timer = 0;
    this.update = function() {
        this.grow();
        timer += 1;
        if (timer == 3000) {
            this.forest.removeTree(this);
        }
    }

}