import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'
const timer = new Timer()

const input = getInput(3)

const grid = { numbers: [], symbols: [], gears: [] }

const numbers = RegExp(/(\d+)/g)
const symbols = RegExp(/[@*$&\/=\-+#%]/g)
const gears = RegExp(/(\*)/g)
const regexes = [
    { regex: numbers, type: 'numbers' },
    { regex: symbols, type: 'symbols' },
    { regex: gears, type: 'gears' },
]

let match
input.forEach((line, index) => {
    regexes.forEach(({ regex, type }) => {
        while ((match = regex.exec(line)) !== null) {
            const value = match[0]
            const data = {
                value,
                start: match.index,
                end: regex.lastIndex,
                line: index,
            }
            grid[type].push(data)
        }
    })
})


// Part 1
function getNumberAdjecent() {
    let result = 0

    grid.numbers.forEach(({ value, start, end, line }) => {
        const symbolsAdjecents = grid.symbols.filter(symbol => {
            // Symbols should be in the same line, next line or previous line
            return [line - 1, line, line + 1].includes(symbol.line) &&
                // Symbol position should be on the left, up or right of the number
                symbol.start >= (start - 1) &&
                symbol.end <= (end + 1)
        })

        if (symbolsAdjecents.length > 0) result += parseInt(value)
    })

    return result
}

// Part 2
function getGearPart() {
    let result = 0

    grid.gears.forEach(({ start, line }) => {
        const numbers = grid.numbers.filter(number => {
            // Get all the positions of the number
            const numberPositions = Array(number.value.length) // New array with the length of the number
                .fill(number.start) // Fill the array with the start position of the number
                .map((v, i) => v + i) // Increase the position of the number with the index

            // Number should be in the same line, next line or previous line
            return [line - 1, line, line + 1].includes(number.line) &&
                // number should be on the left, up or right of the gear
                (
                    numberPositions.includes(start - 1) ||  // left
                    numberPositions.includes(start) ||      // up
                    numberPositions.includes(start + 1)     // right
                )
        })

        if (numbers.length === 2) {
            const numberValues = numbers.map(({ value }) => parseInt(value))
            result += numberValues.reduce((a, b) => a * b, 1)
        }
    })

    return result
}

function getResult(isSecondPart = false) {
    return isSecondPart ? getGearPart() : getNumberAdjecent()
}

export default returnResult(getResult(), getResult(true), timer)