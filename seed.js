function Seed(x, y) {
    this.x = x;
    this.y = y;

    this.show = function() {
        point(this.x, this.y);
    }

    this.update = function() {
        if (this.y < height - 5) { // falling
            this.y += 3;
        }
    }
}