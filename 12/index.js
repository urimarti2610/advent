import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'
const timer = new Timer()

const input = getInput(12)

let grid = {}

function countCombinations(dots, blocks, i, bi, current) {
    const key = `${i},${bi},${current}`

    if (grid[key] !== undefined) {
        return grid[key]
    }

    if (i === dots.length) {
        if (
            (bi === blocks.length && current === 0) ||
            (bi === blocks.length - 1 && blocks[bi] === current)
        ) {
            grid[key] = 1
            return 1
        } else {
            grid[key] = 0
            return 0
        }
    }

    let result = 0
    for (const char of ['.', '#']) {
        if (dots[i] === char || dots[i] === '?') {
            if (char === '.' && current === 0) {
                result += countCombinations(dots, blocks, i + 1, bi, 0)
            } else if (char === '.' && current > 0 && bi < blocks.length && blocks[bi] === current) {
                result += countCombinations(dots, blocks, i + 1, bi + 1, 0)
            } else if (char === '#') {
                result += countCombinations(dots, blocks, i + 1, bi, current + 1)
            }
        }
    }

    grid[key] = result
    return result
}

function solve(part2 = false) {
    let result = 0

    for (const line of input) {
        let [dots, blocks] = line.split(' ')
        if (part2) {
            dots = `${dots}?${dots}?${dots}?${dots}?${dots}`
            blocks = `${blocks},${blocks},${blocks},${blocks},${blocks}`
        }

        blocks = blocks.split(',').map(Number)
        grid = {}

        result += countCombinations(dots, blocks, 0, 0, 0)
    }

    return result
}

export default returnResult(solve(), solve(true), timer)