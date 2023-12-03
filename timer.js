export class Timer {
    constructor() {
        this.start = process.hrtime()
    }

    getDuration() {
        const diff = process.hrtime(this.start)
        return Number(`${diff[0] * 1e3 + diff[1] * 1e-6}`.slice(0, 6))
    }
}