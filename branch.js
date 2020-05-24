function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    
    let branchVec = p5.Vector.sub(this.end, this.begin);
    this.end.x = this.begin.x;
    this.end.y = this.begin.y;

    this.branch = function() {
        const angle = PI / 5;
        const len = 0.65;
        
        // create right branch
        let rightBranchVec = branchVec.copy().rotate(angle);
        rightBranchVec.mult(len);
        let rightEnd = p5.Vector.add(this.end, rightBranchVec);
        let rightBranch = new Branch(this.end, rightEnd);
        // create left branch
        let leftBranchVec = branchVec.copy().rotate(-angle);
        leftBranchVec.mult(len);
        let leftEnd = p5.Vector.add(this.end, leftBranchVec);
        let leftBranch = new Branch(this.end, leftEnd);

        return [rightBranch, leftBranch];
    }

    this.show = function() {
        stroke(200);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    let growth = 0;
    this.grow = function() {
        if (growth < 1) {
            growth += 0.02;
            this.update();
        }
    }

    this.update = function() {
        this.end.x = this.begin.x + branchVec.x * growth;
        this.end.y = this.begin.y + branchVec.y * growth;
    }
}