function Branch(tree, begin, end) {
    this.tree = tree;
    this.begin = begin;
    this.end = end;

    this.branch = function() {
        const angle = PI / 5;
        const len = 0.65;
        let branchVec = p5.Vector.sub(this.end, this.begin);
        // create right branch
        let rightBranchVec = branchVec.copy().rotate(angle);
        rightBranchVec.mult(len);
        let rightEnd = p5.Vector.add(this.end, rightBranchVec);
        let rightBranch = new Branch(this.tree, this.end, rightEnd);
        // create left branch
        let leftBranchVec = branchVec.copy().rotate(-angle);
        leftBranchVec.mult(len);
        let leftEnd = p5.Vector.add(this.end, leftBranchVec);
        let leftBranch = new Branch(this.tree, this.end, leftEnd);

        return [rightBranch, leftBranch];
    }
    
    this.show = function() {
        stroke(200);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    let growth = 0;
    let growingBranch = p5.Vector.sub(this.end, this.begin);
    this.grow = function() {
        if (growth < 1) {
            growth += 0.02;
            this.end.x = this.begin.x + growingBranch.x * growth;
            this.end.y = this.begin.y + growingBranch.y * growth;
        }
        stroke(200);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
}