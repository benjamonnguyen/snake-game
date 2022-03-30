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
const winner = document.getElementById("winner")
const playAgainBtn = document.getElementById("playAgainBtn")

playAgainBtn.addEventListener('click', startGame)

const game = new Game(ctx, winner, playAgainBtn, parseInt(canvas.width), parseInt(canvas.height))

async function startGame() {
    winner.innerText = 'snek'
    playAgainBtn.style.display = 'none'
    await game.start()
}

document.onkeydown = (key) => {
    const newDirection = getDirection(key.code)

    if (newDirection === EDirection.ArrowDown || newDirection === EDirection.ArrowUp) {
        if (game.direction === EDirection.ArrowLeft || game.direction === EDirection.ArrowRight) {
            game.nextDirection = newDirection
        }
    } else if (newDirection === EDirection.ArrowLeft || newDirection === EDirection.ArrowRight) {
        if (game.direction === EDirection.ArrowUp || game.direction === EDirection.ArrowDown) {
            game.nextDirection = newDirection
        }
    } else if (newDirection === EDirection.KeyW || newDirection === EDirection.KeyS) {
        if (game.direction2 === EDirection.KeyA || game.direction2 === EDirection.KeyD) {
            game.nextDirection2 = newDirection
        }
    } else if (newDirection === EDirection.KeyA || newDirection === EDirection.KeyD) {
        if (game.direction2 === EDirection.KeyS || game.direction2 === EDirection.KeyW) {
            game.nextDirection2 = newDirection
        }
    }
}

await game.start()
