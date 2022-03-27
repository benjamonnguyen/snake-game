import Config from "./config"

export default class Coord {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    drawRect(r, ctx) {
        // ctx.fillRect(
        //     Config.CELL_SIZE * this.x,
        //     Config.CELL_SIZE * this.y,
        //     Config.CELL_SIZE,
        //     Config.CELL_SIZE
        // )
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

}
