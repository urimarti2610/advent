import { getInput, returnResult } from '../helper.js'

const input = getInput(3)

// Part 1
function getNumberAdjecent(line, index) {
    const numbers = RegExp(/(\d+)/g)
    const matches = line.match(numbers)

    if (!matches) return 0

    return matches.map((match) => {
        const searchIndex = line.search(match)
        const number = parseInt(match)
        const numberLength = match.length

        line = line.replace(match, '.'.repeat(numberLength))

        const before = input[index - 1]

        if (before && checkAdjecent(before, searchIndex, numberLength)) {
            return number;
        }

        const next = input[index + 1]
        if (next && checkAdjecent(next, searchIndex, numberLength)) {
            return number;
        }

        const charBefore = line[searchIndex - 1]
        if (charBefore && isSpecialCharacter(charBefore)) {
            return number;
        }

        const charAfter = line[searchIndex + numberLength]
        if (charAfter && isSpecialCharacter(charAfter)) {
            return number;
        }

        return 0;
    }).flat().reduce((a, b) => a + b, 0)
}

function checkAdjecent(line, position, length) {
    if (position > 0) {
        position--
    }

    if (position + length < line.length) {
        length += 2
    }

    const characters = line.split('').slice(position, position + length)

    return characters.some((character) => isSpecialCharacter(character))
}

function isSpecialCharacter(character) {
    return character !== '.' && isNaN(Number(character))
}

// Part 2
function getGearPart(line, index) {
    const asteriscs = RegExp(/(\*)/g)
    const matches = line.match(asteriscs)

    const adjecentNumbers = []

    matches?.forEach((match) => {
        let currentMatxes = []
        let result = 0

        const searchIndex = line.indexOf(match)
        line = line.replace(match, '.')

        currentMatxes.push(getNumberAdjecentToAsterisk(line, searchIndex))

        const before = input[index - 1]
        if (before) {
            currentMatxes.push(getNumberAdjecentToAsterisk(before, searchIndex))
        }

        const next = input[index + 1]
        if (next) {
            currentMatxes.push(getNumberAdjecentToAsterisk(next, searchIndex))
        }

        currentMatxes = currentMatxes.flat().filter(v => v > 0)
        if (currentMatxes.length === 2) {
            result = currentMatxes.reduce((a, b) => a * b, 1)
        }

        adjecentNumbers.push(result)
    })

    return adjecentNumbers.reduce((a, b) => a + b, 0)
}

function getNumberAdjecentToAsterisk(line, position) {
    if (position > 0) {
        position--
    }

    const characters = line.split('').slice(position, position + 3)

    const numberIndexes = characters.map((character, index) => {
        const number = Number(character)
        if (isNaN(number)) return null

        const numPosition = position + index
        return { numPosition, number }
    }).filter((index) => index !== null)

    if (numberIndexes.length === 0) return 0

    // Get chars on the left
    let gotFirstChar = false
    do {
        const currentPosition = Math.min(...numberIndexes.map(({ numPosition }) => numPosition)) - 1
        const currentChar = Number(line.charAt(currentPosition))
        if (!isNaN(currentChar)) {
            numberIndexes.push({ numPosition: currentPosition, number: currentChar })
        } else {
            gotFirstChar = true
        }

        if (currentPosition === 0) {
            gotFirstChar = true
        }
    } while (gotFirstChar === false)

    // Get chars on the right
    let gotLastChar = false
    do {
        const currentPosition = Math.max(...numberIndexes.map(({ numPosition }) => numPosition)) + 1
        const currentChar = Number(line.charAt(currentPosition))
        if (!isNaN(currentChar)) {
            numberIndexes.push({ numPosition: currentPosition, number: currentChar })
        } else {
            gotLastChar = true
        }

        if (currentPosition === line.length - 1) {
            gotLastChar = true
        }
    } while (gotLastChar === false)

    numberIndexes.sort((a, b) => a.numPosition - b.numPosition)

    // Separate numbers
    const numbers = []
    let currentNumberIndex = 0
    let lastPosition
    for (let i = 0; i < numberIndexes.length; i++) {
        const { number, numPosition } = numberIndexes[i]

        if (lastPosition && numPosition - lastPosition > 1) {
            currentNumberIndex++
        }

        lastPosition = numPosition

        numbers[currentNumberIndex] ||= ''
        numbers[currentNumberIndex] += number
    }

    return numbers.map(number => Number(number))
}

function getResult(isSecondPart = false) {
    let result = 0

    input.forEach((line, index) => {
        result += isSecondPart ?
            getGearPart(line, index) :
            getNumberAdjecent(line, index)
    })

    return result
}

export default returnResult(getResult(), getResult(true))