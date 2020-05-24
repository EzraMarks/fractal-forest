function Seed(x, y) {
    this.x = x;
    this.y = y;


    this.show = function() {
        if (this.y < height - 5) {
            this.y += 1;
        }
        point(this.x, this.y);
    }
}