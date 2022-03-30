import Segment from "./Segment"
import Coord from "./Coord"
import Snake from "./Snake"

export default class Snake2 extends Snake {

    constructor() {
        super()
        this.color = "#f4deb3"
    }

    initialize(ctx) {
        let x = 28
        const y = 17
        let currSegment = new Segment(new Coord(x, y), null)
        let segmentCount = 1
        this.tail = currSegment
        while (segmentCount < 5) {
            currSegment.next = new Segment(new Coord(--x, y), null)
            currSegment = currSegment.next
            segmentCount++
        }
    
        this.head = currSegment
        this.segmentCount = segmentCount

        this.render(ctx)
    }

}