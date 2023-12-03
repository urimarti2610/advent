import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'

const input = getInput(1)

const mappedNumbers = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

function getNumberPerLine(line, includeLetters = false) {
    const numbers = []

    if (includeLetters) {
        // Get all numbers by letters from line
        Object.entries(mappedNumbers).forEach(([numName, number]) => {
            let newLine = line
            let position = 0
            let deleted = 0
            do {
                position = newLine.search(numName)
                if (position > -1) {
                    numbers.push({ position: position + deleted, number })
                    deleted += numName.length
                    newLine = newLine.replace(numName, '')
                }
            } while (position > -1)
        })
    }

    // Get all numbers by digits from line
    line.split('').forEach((char, position) => {
        const number = Number(char)
        if (!isNaN(number)) {
            numbers.push({ position, number })
        }
    })

    const firstNumber = numbers.sort((a, b) => a.position - b.position)[0]
    const lastNumber = numbers.sort((a, b) => b.position - a.position)[0]

    return Number([firstNumber.number, lastNumber.number].join(''))
}

function getResult(isSecondPart = false) {
    return input.map((line) => getNumberPerLine(line, isSecondPart)).reduce((a, b) => a + b, 0)
}

export default returnResult(getResult(), getResult(true), new Timer())