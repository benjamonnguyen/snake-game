import Config from "./config"

export default class Coord {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    drawRect(color, r, ctx) {
        ctx.fillStyle = color
        ctx.roundRect(
            Config.CELL_SIZE * this.x,
            Config.CELL_SIZE * this.y,
            Config.CELL_SIZE,
            Config.CELL_SIZE,
            r
        ).fill()
    }

    clearRect(ctx) {
        ctx.clearRect(
            Config.CELL_SIZE * this.x,
            Config.CELL_SIZE * this.y,
            Config.CELL_SIZE,
            Config.CELL_SIZE
        )
    }

    toString() {
        return this.x + ',' + this.y
    }

}
