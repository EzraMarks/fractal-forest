/**
 * Represents a branch of a tree.
 * @param {Vector} begin The start location of the branch.
 * @param {Vector} end   The end location of the branch.
 * @param {Number} depth The recursion depth at which this branch appears.
 * @param {Tree}   tree  The tree which contains this branch.
 */
function Branch(begin, end, depth, tree) {
    this.begin = begin;
    this.end = end;
    this.depth = depth;
    this.tree = tree;
    // Vector representing the branch if it began at the origin.
    const branchVec = p5.Vector.sub(this.end, this.begin);
    // Spawns the branch with no length, so it has room to grow.
    this.end.x = this.begin.x;
    this.end.y = this.begin.y;

    /**
     * Returns two new Branches, splitting off from the current Branch.
     * @returns {Array[Branch]} Array containing the left and right Branches.
     */
    this.branch = function() {
        let angle = PI / 6;
        let len = 0.7;
        angle = (0.6 * angle) + (0.8 * Math.random() * angle);
        len = (0.75 * len) + (0.5 * Math.random() * len);

        // Creates right branch.
        const rightBranchVec = branchVec.copy().rotate(angle);
        rightBranchVec.mult(len);
        const rightEnd = p5.Vector.add(this.end, rightBranchVec);
        const rightBranch = new Branch(this.end, rightEnd, this.depth + 1, tree);
        // Creates left branch.
        const leftBranchVec = branchVec.copy().rotate(-angle);
        leftBranchVec.mult(len);
        const leftEnd = p5.Vector.add(this.end, leftBranchVec);
        const leftBranch = new Branch(this.end, leftEnd, this.depth + 1, tree);

        return [rightBranch, leftBranch];
    }
    
    let relativeDepth = this.depth / this.tree.depth;
    let branchColor = 255 * (1 - (relativeDepth * 0.8));
    let branchSize;
    let lineWeight;

    /**
     * Renders the branch.
     */
    this.show = function() {
        stroke(branchColor * this.tree.liveliness);
        strokeWeight(lineWeight);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.growth = 0;
    /**
     * Grows the branch over time.
     */
    this.grow = function() {
        if (this.growth < 1) {
            this.growth += 0.03 - this.growth / 35;
        }
    }

    /**
     * Updates the state of the branch.
     */
    this.update = function() {
        branchSize = p5.Vector.sub(this.end, this.begin).mag();
        lineWeight = 1 + (branchSize / 40) + 2 * (1 - relativeDepth);

        this.end.x = this.begin.x + branchVec.x * this.growth;
        this.end.y = this.begin.y + branchVec.y * this.growth;
    }
}