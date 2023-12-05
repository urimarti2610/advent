import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

let lines = getInput(5)
lines.push(':')

const regex = RegExp(/(\d+)/g)
const seeds = lines[0].match(regex).map(v => Number(v));
const ranges = getRanges();
const steps = getSteps()

function getRanges() {
    const result = []
    for (let i = 0; i < seeds.length; i += 2) {
        const start = seeds[i]
        const end = start + seeds[i + 1] - 1
        result.push([start, end])
    }

    return result
}

function getSteps() {
    const result = []
    const current = []
    for (let line of lines.slice(3)) {
        if (!line) {
            continue
        }

        if (line.slice(-1) === ':') {
            // sort to finish faster
            current.sort((a, b) => a[0] - b[0])
            result.push([...current])
            current.length = 0
            continue
        }

        const [destinationRange, sourceRange, rangeLength] = line.match(regex).map(Number)
        current.push([sourceRange, destinationRange, rangeLength])
    }

    return result
}

function part1() {
    let currentWork = [...seeds]
    for (const step of steps) {
        const nextWork = []
        for (const number of currentWork) {
            let done = false

            for (const [sourceRange, destinationRange, rangeLength] of step) {
                if (number >= sourceRange + rangeLength) {
                    continue
                }

                if (number < sourceRange) {
                    nextWork.push(number)
                } else {
                    nextWork.push(number + destinationRange - sourceRange)
                }

                done = true
                break
            }

            if (!done) {
                nextWork.push(number)
            }
        }
        currentWork = [...nextWork]
    }

    return Math.min(...currentWork)
}

function part2() {
    let currentWork = [...ranges]
    for (const step of steps) {
        const nextWork = []
        for (let [a, b] of currentWork) {
            let done = false

            for (const [sourceRange, destinationRange, rangeLength] of step) {
                const offset = destinationRange - sourceRange
                const end = sourceRange + rangeLength

                if (a >= end) {
                    continue
                }

                if (a < sourceRange) {
                    nextWork.push([a, sourceRange - 1])
                    a = sourceRange
                }

                if (b >= end) {
                    nextWork.push([a + offset, end + offset - 1])
                    a = end
                } else {
                    nextWork.push([a + offset, b + offset])
                    a = b + 1
                    done = true
                    break
                }
            }

            if (!done && a <= b) {
                nextWork.push([a, b])
            }
        }

        currentWork = []
        for (const [a, b] of nextWork.sort((x, y) => x[0] - y[0])) {
            const lastPosition = currentWork.length - 1

            if (currentWork.length && a === currentWork[lastPosition][1] + 1) {
                currentWork[lastPosition] = [currentWork[lastPosition][0], b]
            } else {
                currentWork.push([a, b])
            }
        }
    }

    return currentWork[0][0]
}

export default returnResult(part1(), part2(), timer)