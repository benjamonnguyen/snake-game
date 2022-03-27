import Game from "./Game"
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
const score = document.getElementById("score")
score.innerText = "SCORE: 0"

const game = new Game(ctx, score, parseInt(canvas.width), parseInt(canvas.height))

document.onkeydown = (key) => {
    const newDirection = getDirection(key.code)
    if (!(((game.direction === EDirection.ArrowDown || game.direction === EDirection.ArrowUp)
        && (newDirection === EDirection.ArrowDown || newDirection === EDirection.ArrowUp))
        || ((game.direction === EDirection.ArrowLeft || game.direction === EDirection.ArrowRight)
            && (newDirection === EDirection.ArrowLeft || newDirection === EDirection.ArrowRight)))
    ) {
        game.nextDirection = newDirection
    }
}

await game.start()
