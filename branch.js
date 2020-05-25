/**
 * Represents a branch of a tree.
 * @param {Vector} begin The start location of the branch.
 * @param {Vector} end   The end location of the branch.
 */
function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
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
        let angle = PI / 5;
        let len = 0.65;
        angle = angle * 0.5 + angle * Math.random();
        len = len * 0.5 + angle * Math.random();

        // Creates right branch.
        const rightBranchVec = branchVec.copy().rotate(angle);
        rightBranchVec.mult(len);
        const rightEnd = p5.Vector.add(this.end, rightBranchVec);
        const rightBranch = new Branch(this.end, rightEnd);
        // Creates left branch.
        const leftBranchVec = branchVec.copy().rotate(-angle);
        leftBranchVec.mult(len);
        const leftEnd = p5.Vector.add(this.end, leftBranchVec);
        const leftBranch = new Branch(this.end, leftEnd);

        return [rightBranch, leftBranch];
    }

    /**
     * Renders the branch.
     */
    this.show = function() {
        stroke(200);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    let growth = 0;
    /**
     * Grows the branch over time.
     */
    this.grow = function() {
        if (growth < 1) {
            growth += 0.02;
            this.update();
        }
    }

    /**
     * Updates the vectors which make up the branch.
     */
    this.update = function() {
        this.end.x = this.begin.x + branchVec.x * growth;
        this.end.y = this.begin.y + branchVec.y * growth;
    }
}