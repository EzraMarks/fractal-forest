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
        let angle = PI / 5.6;
        let len = 0.7;

        // Creates right branch.
        randAngle = (0.75 * angle) + (0.5 * Math.random() * angle);
        randLen = (0.8 * len) + (0.4 * Math.random() * len);
        const rightBranchVec = branchVec.copy().rotate(randAngle);
        rightBranchVec.mult(randLen);
        const rightEnd = p5.Vector.add(this.end, rightBranchVec);
        const rightBranch = new Branch(this.end, rightEnd, this.depth + 1, tree);
        // Creates left branch.
        randAngle = (0.85 * randAngle) + (0.3 * Math.random() * randAngle);
        randLen = (0.85 * randLen) + (0.3 * Math.random() * randLen);
        const leftBranchVec = branchVec.copy().rotate(-randAngle);
        leftBranchVec.mult(randLen);
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
        strokeWeight(lineWeight);
        stroke(branchColor * this.tree.liveliness);
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
        this.end.x = this.begin.x + branchVec.x * this.growth;
        this.end.y = this.begin.y + branchVec.y * this.growth;

        branchSize = p5.Vector.sub(this.end, this.begin).mag();
        lineWeight = 1.5 + 0.5 * (branchSize ** 0.55) * ((1 - relativeDepth) ** 2);
    }
}