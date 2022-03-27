import Segment from "./Segment"
import { EDirection } from "./direction"
import Coord from "./Coord"
import Config from "./config"

export default class Snake {

    constructor() {
        [ this.head, this.tail, this.segmentCount ] = this.#initialize()
        this.bodyMap = new Map()
    }

    #initialize() {
        let x = 6
        const y = 5
        let prevSegment = null
        let currSegment = new Segment(new Coord(x, y), prevSegment)
        let segmentCount = 1
        const head = currSegment
        while (segmentCount < 5) {
            prevSegment = currSegment
            currSegment = new Segment(new Coord(--x, y), prevSegment)
            segmentCount++
        }
    
        return [ head, currSegment, segmentCount ]
    }

    #addToBodyMap(coord) {
        if (!this.bodyMap.has(coord.x)) {
            this.bodyMap.set(coord.x, new Set([coord.y]))
        } else {
            this.bodyMap.get(coord.x).add(coord.y)
        }
    }

    #removeFromBodyMap(coord) {
        const ySet = this.bodyMap.get(coord.x)
        if (ySet != null) {
            ySet.delete(coord.y)
        }
    }

    bodyMapHas(coord) {
        const ySet = this.bodyMap.get(coord.x)
        if (ySet != null) {
            return ySet.has(coord.y)
        }
        return false
    }
    
    render(ctx) {
        let currSegment = this.tail
        while (currSegment != null) {
            currSegment.coord.drawRect(Config.SEGMENT_RADIUS, ctx)
            if (!(currSegment.next == null)) {
                this.#addToBodyMap(currSegment.coord)
            }
            currSegment = currSegment.next
        }
    }

    move(direction, ctx) {
        let newHeadCoord;
        switch ( direction ) {
            case EDirection.ArrowDown:
                newHeadCoord = new Coord(this.head.coord.x, this.head.coord.y + 1)
                break
            case EDirection.ArrowUp:
                newHeadCoord = new Coord(this.head.coord.x, this.head.coord.y - 1)
                break
            case EDirection.ArrowRight:
                newHeadCoord = new Coord(this.head.coord.x + 1, this.head.coord.y)
                break
            case EDirection.ArrowLeft:
                newHeadCoord = new Coord(this.head.coord.x - 1, this.head.coord.y)
                break
            default:
                break
        }
        this.tail.coord.clearRect(ctx)
        this.#removeFromBodyMap(this.tail.coord)

        this.head.next = new Segment(newHeadCoord, null)
        this.#addToBodyMap(this.head.coord)
        this.head = this.head.next
        this.tail = this.tail.next

        this.head.coord.drawRect(Config.SEGMENT_RADIUS, ctx)
    }

    grow() {
        this.tail = new Segment(this.tail.coord, this.tail)
        this.#addToBodyMap(this.tail.coord)
    }

}