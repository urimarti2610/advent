export class Timer {
    constructor() {
        this.start = new Date().getTime()
    }

    getDuration() {
        const now = new Date().getTime()

        const difference = (now - this.start) / 1000;
        return difference
    }
}