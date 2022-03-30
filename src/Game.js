import { EDirection } from "./direction"
import Snake from "./Snake"
import Snake2 from "./Snake2"
import Config from "./config"
import Coord from "./Coord"

export default class Game {

    constructor(ctx, winner, playAgainBtn, width, height) {
        this.ctx = ctx
        this.winner = winner
        this.playAgainBtn = playAgainBtn
        this.width = width
        this.height = height

        // TODO: score, winner per round gets 5 + max(diff in len, 0) first to 25
    }

    async start() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.tickRate = Config.TICK_RATE_MS * Config.TICK_MULTIPLIER
        this.direction = EDirection.ArrowRight
        this.nextDirection = this.direction
        this.direction2 = EDirection.KeyA
        this.nextDirection2 = this.direction2
        this.snake = new Snake()
        this.snake2 = new Snake2()
        this.foodCoord = this.#generateFood()
        this.snake.initialize(this.ctx)
        this.snake2.initialize(this.ctx)
        this.#tick()
    }

    #tick() {
        this.snake.move(this.nextDirection, this.ctx)
        this.direction = this.nextDirection
        this.snake2.move(this.nextDirection2, this.ctx)
        this.direction2 = this.nextDirection2
        const collider = this.#checkForCollision()
        if (collider != null) {
            this.#gameOver(collider)
        } else {
            this.#handleFoodLogic()
            setTimeout(() => this.#tick(), Math.max(this.tickRate--/Config.TICK_MULTIPLIER, Config.MIN_TICK_RATE_MS))
        }
    }

    #checkForCollision() {
        let collider = null
        if (this.snake.body.has(this.snake.head.coord.toString())
            || this.snake2.body.has(this.snake.head.coord.toString())
            || this.#checkForBoundaryCollision(this.snake.head.coord)) {
                collider = (collider == null) ? "snake" : "both"
        } 
        if (this.snake.body.has(this.snake2.head.coord.toString())
            || this.snake2.body.has(this.snake2.head.coord.toString())
            || this.#checkForBoundaryCollision(this.snake2.head.coord)) {
                collider = (collider == null) ? "snake2" : "both"
        }
        return collider
    }

    #handleFoodLogic() {
        if (this.snake.head.coord.x === this.foodCoord.x
            && this.snake.head.coord.y === this.foodCoord.y) {
            this.snake.grow()
            this.foodCoord = this.#generateFood()
        } else if (this.snake2.head.coord.x === this.foodCoord.x
            && this.snake2.head.coord.y === this.foodCoord.y) {
            this.snake2.grow()
            this.foodCoord = this.#generateFood()
        }
    }

    #checkForBoundaryCollision(coord) {
        // return false
        if ((coord.x < 0 || coord.x > this.width / Config.CELL_SIZE - 1)
            || (coord.y < 0 || coord.y > this.height / Config.CELL_SIZE - 1)
        ) {
            return true
        }
        return false
    }

    #gameOver(collider) {
        let winner = 'Draw'
        switch (collider) {
            case 'snake':
                winner = 'White Snake wins!'
                break;
            case 'snake2':
                winner = 'Black Snake wins!'
                break;
            default:
                break;
        }
        this.winner.innerText = winner
        this.winner.style.display = 'inline'
        this.playAgainBtn.style.display = 'inline'
    }

    #generateFood() {
        let coord
        while (!coord || this.snake.body.has(coord.toString()) || this.snake2.body.has(coord.toString())) {
            coord = new Coord(this.#getRandomInt(this.width / Config.CELL_SIZE),
            this.#getRandomInt(this.height / Config.CELL_SIZE))
        }

        coord.drawRect("#d83a20", 20, this.ctx)

        return coord
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}