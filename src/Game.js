import { EDirection } from "./direction"
import Snake from "./Snake"
import Config from "./config"
import Coord from "./Coord"

export default class Game {

    constructor(ctx, scoreDisplay, width, height) {
        this.ctx = ctx
        this.scoreDisplay = scoreDisplay
        this.width = width
        this.height = height

        this.direction = EDirection.ArrowRight
        this.snake = new Snake()
        this.foodCoord = this.#generateFood()
        this.score = 0
    }

    async start() {
        this.snake.render(this.ctx)
        this.#tick()
    }

    #tick() {
        this.snake.move(this.direction, this.ctx)
        this.#handleFoodLogic()
        if (this.#checkForBoundaryCollision(this.snake.head.coord)
            || this.snake.bodyMapHas(this.snake.head.coord)) {
            this.#gameOver()
        } else {
            setTimeout(() => this.#tick(), Config.TICK_RATE_MS)
        }
    }

    #handleFoodLogic() {
        if (this.snake.head.coord.x === this.foodCoord.x
            && this.snake.head.coord.y === this.foodCoord.y) {
            this.score += 10
            this.scoreDisplay.innerText = "SCORE: " + this.score
            this.snake.grow()
            this.foodCoord = this.#generateFood()
        }
    }

    #checkForBoundaryCollision(coord) {
        if ((coord.x < 0 || coord.x > this.width / Config.CELL_SIZE - 1)
            || (coord.y < 0 || coord.y > this.height / Config.CELL_SIZE - 1)
        ) {
            return true
        }
        return false
    }

    #gameOver() {
        return
    }

    #generateFood() {
        let coord
        while (!coord || this.snake.bodyMapHas(coord)) {
            coord = new Coord(this.#getRandomInt(this.width / Config.CELL_SIZE),
            this.#getRandomInt(this.height / Config.CELL_SIZE))
        }

        coord.drawRect(20, this.ctx)

        return coord
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}