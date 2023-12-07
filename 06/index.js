import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(6)

const regex = RegExp(/(\d+)/g)
const times = input[0].match(regex).map(Number);
const distances = input[1].match(regex).map(Number);

const grid = times.map((time, index) => {
    return {
        time,
        distance: distances[index]
    }
})

function getTotalWinningOptions(time, distance) {
    let options = 0
    let done = false

    for (let timing = 0; timing <= time; timing++) {
        const leftTiming = time - timing
        const distanceDone = (timing * leftTiming)

        if (distanceDone > distance) {
            options += 1
        } else if (done === true) {
            continue
        }
    }

    return options
}

function part1() {
    let result = 1

    for (const race of grid) {
        const { time, distance } = race
        const options = getTotalWinningOptions(time, distance)

        result *= options
    }

    return result
}

function part2() {
    const time = Number(times.join(''))
    const distance = Number(distances.join(''))

    return getTotalWinningOptions(time, distance)
}

export default returnResult(part1(), part2(), timer)