import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'
const timer = new Timer()

const input = getInput(11)

const grid = input.map((row) => row.split(''))

const numRows = grid.length
const numCols = grid[0].length

for (let r = 0; r < numRows; r++) {
    if (grid[r].length !== numCols) {
        throw new Error('Grid is not rectangular!')
    }
}

const emptyRows = []
for (let r = 0; r < numRows; r++) {
    let isEmpty = true

    for (let c = 0; c < numCols; c++) {
        if (grid[r][c] === '#') {
            isEmpty = false
            break
        }
    }

    if (isEmpty) {
        emptyRows.push(r)
    }
}

const emptyCols = []
for (let c = 0; c < numCols; c++) {
    let isEmpty = true
    for (let r = 0; r < numRows; r++) {
        if (grid[r][c] === '#') {
            isEmpty = false
            break
        }
    }

    if (isEmpty) {
        emptyCols.push(c)
    }
}

const galaxy = []
for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
        if (grid[r][c] === '#') {
            galaxy.push([r, c])
        }
    }
}

function solve(part2 = false) {
    const expansionFactor = part2 ? 10 ** 6 - 1 : 2 - 1
    let result = 0

    for (let i = 0; i < galaxy.length; i++) {
        const [r, c] = galaxy[i]
        for (let j = i; j < galaxy.length; j++) {
            const [r2, c2] = galaxy[j]
            let dij = Math.abs(r2 - r) + Math.abs(c2 - c)

            for (const er of emptyRows) {
                if (Math.min(r, r2) <= er && er <= Math.max(r, r2)) {
                    dij += expansionFactor
                }
            }

            for (const ec of emptyCols) {
                if (Math.min(c, c2) <= ec && ec <= Math.max(c, c2)) {
                    dij += expansionFactor
                }
            }

            result += dij
        }
    }

    return result
}

export default returnResult(solve(), solve(true), timer)