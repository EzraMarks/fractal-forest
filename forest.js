function Forest() {
    this.seeds = [];
    this.trees = [];

    this.addTree = function(newTree) {
        this.trees.push(newTree);
    }

    this.addSeeds = function(newSeeds) {
        for (let i = 0; i < newSeeds.length; i++) {
            this.seeds.push(newSeeds[i]);
        }
    }

    this.show = function() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].grow();
        }
        for (let i = 0; i < this.seeds.length; i++) {
            this.seeds[i].show();
        }
    }
}