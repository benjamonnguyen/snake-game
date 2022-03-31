import Game from "./Game"
import { EDirection } from "./direction"
import Snake from "./Snake"
import Snake2 from "./Snake2"
import Config from "./config"
import Coord from "./Coord"

export default class Local2PGame extends Game {

    constructor(ctx, infoDisplay, singleBtn, localBtn, width, height) {
        super(ctx, infoDisplay, singleBtn, localBtn, width, height)

        // TODO: score, winner per round gets 5 + max(diff in len, 0) first to 25
    }

    async start() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.tickRate = Config.TICK_RATE_MS * Config.TICK_MULTIPLIER
        this.snake = new Snake("#101f15", EDirection.ArrowRight)
        this.snake2 = new Snake2("#f4deb3", EDirection.KeyA)
        this.snake.initialize(this.ctx)
        this.snake2.initialize(this.ctx)
        this.foodCoord = this.#generateFood()
        this.#tick()
    }

    #tick() {
        this.snake.move(this.snake.nextDirection, this.ctx)
        this.snake.direction = this.snake.nextDirection
        this.snake2.move(this.snake2.nextDirection, this.ctx)
        this.snake2.direction = this.snake2.nextDirection
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
            || super.checkForBoundaryCollision(this.snake.head.coord)) {
                collider = (collider == null) ? "snake" : "both"
        } 
        if (this.snake.body.has(this.snake2.head.coord.toString())
            || this.snake2.body.has(this.snake2.head.coord.toString())
            || super.checkForBoundaryCollision(this.snake2.head.coord)) {
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
        this.infoDisplay.innerText = winner
        this.infoDisplay.style.display = 'inline'
        this.singleBtn.style.display = 'inline'
        this.localBtn.style.display = 'inline'
    }

    #generateFood() {
        let coord
        while (!coord || this.snake.body.has(coord.toString()) || this.snake2.body.has(coord.toString())) {
            coord = new Coord(super.getRandomInt(this.width / Config.CELL_SIZE),
            super.getRandomInt(this.height / Config.CELL_SIZE))
        }

        coord.drawRect("#d83a20", 20, this.ctx)

        return coord
    }
}