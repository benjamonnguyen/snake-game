const EDirection = {
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowRight": "right",
    "KeyW": "w",
    "KeyS": "s",
    "KeyA": "a",
    "KeyD": "d",
}

function getDirection(key) {
    return EDirection[key]
}

export { EDirection, getDirection }