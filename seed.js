/**
 * Represents a seed in the forest.
 * @param {Number} x The x-coordinate to spawn the new seed.
 * @param {Number} y The y-coordinate to spawn the new seed.
 */
function Seed(x, y) {
    this.x = x;
    this.y = y;

    /**
     * Renders the seed.
     */
    this.show = function() {
        point(this.x, this.y);
    }

    /**
     * Updates the seed over time.
     */
    this.update = function() {
        if (this.y < height - 5) { // falling
            this.y += 3;
        }
    }
}