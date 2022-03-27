const EDirection = {
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowRight": "right"
}

function getDirection(key) {
    return EDirection[key]
}

export { EDirection, getDirection }