import fs from 'fs'

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

const input = fs.readFileSync('./01/input.txt', 'utf8').split('\n')

function getNumberPositions(line, numbers = []) {
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

const result = input.map((line) => getNumberPositions(line)).reduce((a, b) => a + b, 0)

export default result