import Segment from "./Segment"
import { EDirection } from "./direction"
import Coord from "./Coord"
import Config from "./config"

export default class Snake {

    constructor() {
        this.body = new Set()
        this.color = "#101f15"
    }

    initialize(ctx) {
        let x = 6
        const y = 5
        let prevSegment = null
        let currSegment = new Segment(new Coord(x, y), prevSegment)
        let segmentCount = 1
        this.head = currSegment
        while (segmentCount < 5) {
            prevSegment = currSegment
            currSegment = new Segment(new Coord(--x, y), prevSegment)
            segmentCount++
        }

        this.tail = currSegment
        this.segmentCount = segmentCount

        this.render(ctx)
    }
    
    render(ctx) {
        let currSegment = this.tail
        while (currSegment != null) {
            currSegment.coord.drawRect(this.color, Config.SEGMENT_RADIUS, ctx)
            if (currSegment.next != null) {
                this.body.add(currSegment.coord.toString())
            }
            currSegment = currSegment.next
        }
    }

    move(direction, ctx) {
        let newHeadCoord;
        switch ( direction ) {
            case EDirection.ArrowDown:
            case EDirection.KeyS:
                newHeadCoord = new Coord(this.head.coord.x, this.head.coord.y + 1)
                break
            case EDirection.ArrowUp:
            case EDirection.KeyW:
                newHeadCoord = new Coord(this.head.coord.x, this.head.coord.y - 1)
                break
            case EDirection.ArrowRight:
            case EDirection.KeyD:
                newHeadCoord = new Coord(this.head.coord.x + 1, this.head.coord.y)
                break
            case EDirection.ArrowLeft:
            case EDirection.KeyA:
                newHeadCoord = new Coord(this.head.coord.x - 1, this.head.coord.y)
                break
            default:
                break
        }
        this.tail.coord.clearRect(ctx)
        this.body.delete(this.tail.coord.toString())

        this.head.next = new Segment(newHeadCoord, null)
        this.body.add(this.head.coord.toString())
        this.head = this.head.next
        this.tail = this.tail.next

        this.head.coord.drawRect(this.color, Config.SEGMENT_RADIUS, ctx)
    }

    grow() {
        this.tail = new Segment(this.tail.coord, this.tail)
        this.body.add(this.tail.coord.toString())
    }

}