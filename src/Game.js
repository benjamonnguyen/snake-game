import { EDirection } from "./direction"
import Snake from "./Snake"
import Config from "./config"
import Coord from "./Coord"

export default class Game {

    constructor(ctx, infoDisplay, singleBtn, localBtn, width, height) {
        this.ctx = ctx
        this.infoDisplay = infoDisplay
        this.singleBtn = singleBtn
        this.localBtn = localBtn
        this.width = width
        this.height = height
    }

    async start() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.tickRate = Config.TICK_RATE_MS * Config.TICK_MULTIPLIER
        this.snake = new Snake("#101f15", EDirection.ArrowRight)
        this.snake.initialize(this.ctx)
        this.foodCoord = this.#generateFood()
        this.infoDisplay.innerText = "SCORE: 0"
        this.#tick()
    }

    #tick() {
        this.snake.move(this.snake.nextDirection, this.ctx)
        this.snake.direction = this.snake.nextDirection
        if (this.#checkForCollision()) {
            this.#gameOver()
        } else {
            this.#handleFoodLogic()
            setTimeout(() => this.#tick(), Math.max(this.tickRate-- / Config.TICK_MULTIPLIER, Config.MIN_TICK_RATE_MS))
        }
    }

    #checkForCollision() {
        if (this.checkForBoundaryCollision(this.snake.head.coord)
            || this.snake.body.has(this.snake.head.coord.toString())) {
            return true
        }
        return false
    }

    #handleFoodLogic() {
        if (this.snake.head.coord.x === this.foodCoord.x
            && this.snake.head.coord.y === this.foodCoord.y) {
            this.snake.grow()
            this.foodCoord = this.#generateFood()
            this.infoDisplay.innerText = "SCORE: " + ++this.snake.score
        }
    }

    checkForBoundaryCollision(coord) {
        // return false
        if ((coord.x < 0 || coord.x > this.width / Config.CELL_SIZE - 1)
            || (coord.y < 0 || coord.y > this.height / Config.CELL_SIZE - 1)
        ) {
            return true
        }
        return false
    }

    #gameOver() {
        this.singleBtn.style.display = 'inline'
        this.localBtn.style.display = 'inline'
    }

    #generateFood() {
        let coord
        while (!coord || this.snake.body.has(coord.toString())) {
            coord = new Coord(this.getRandomInt(this.width / Config.CELL_SIZE),
                this.getRandomInt(this.height / Config.CELL_SIZE))
        }

        coord.drawRect("#d83a20", 20, this.ctx)

        return coord
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}