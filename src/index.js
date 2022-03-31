import Game from "./Game"
import Local2PGame from "./Local2PGame"
import { getDirection, EDirection } from "./direction"

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

const canvas = document.getElementById("snakeLayer")
const ctx = canvas.getContext("2d")
const singleBtn = document.getElementById("1p")
const localBtn = document.getElementById("2pLocal")
const infoDisplay = document.getElementById("info")

let game
singleBtn.addEventListener('click', async () => {
    game = new Game(ctx, infoDisplay, singleBtn, localBtn, parseInt(canvas.width), parseInt(canvas.height))
    await startGame() 
})
localBtn.addEventListener('click', async () => {
    game = new Local2PGame(ctx, infoDisplay, singleBtn, localBtn, parseInt(canvas.width), parseInt(canvas.height))
    await startGame()
})

async function startGame() {
    singleBtn.style.display = 'none'
    localBtn.style.display = 'none'
    await game.start()
}

document.onkeydown = (key) => {
    const newDirection = getDirection(key.code)

    if (newDirection === EDirection.ArrowDown || newDirection === EDirection.ArrowUp) {
        if (game.snake.direction === EDirection.ArrowLeft || game.snake.direction === EDirection.ArrowRight) {
            game.snake.nextDirection = newDirection
        }
    } else if (newDirection === EDirection.ArrowLeft || newDirection === EDirection.ArrowRight) {
        if (game.snake.direction === EDirection.ArrowUp || game.snake.direction === EDirection.ArrowDown) {
            game.snake.nextDirection = newDirection
        }
    } else if (newDirection === EDirection.KeyW || newDirection === EDirection.KeyS) {
        if (game.snake2.direction === EDirection.KeyA || game.snake2.direction === EDirection.KeyD) {
            game.snake2.nextDirection = newDirection
        }
    } else if (newDirection === EDirection.KeyA || newDirection === EDirection.KeyD) {
        if (game.snake.direction === EDirection.KeyS || game.snake2.direction === EDirection.KeyW) {
            game.snake2.nextDirection = newDirection
        }
    }
}
