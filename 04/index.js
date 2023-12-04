import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'
const timer = new Timer()

const input = getInput(4)

const numbersGrid = input.map((row, i) => {
    const [inputPart1, inputPart2] = row.split('|')
    const numbersPart = inputPart1.split(':')
    const gameId = Number(numbersPart[0].trim().split(' ').filter(v => v !== '')[1])

    const playingNumbers = numbersPart[1].trim().split(' ').map(v => Number(v)).filter(v => v > 0)
    const winningNumbers = inputPart2.trim().split(' ').map(v => Number(v)).filter(v => v > 0)

    return {
        gameId,
        winningNumbers,
        playingNumbers
    }
})

function part1() {
    let result = 0

    numbersGrid.forEach(({ winningNumbers, playingNumbers }) => {
        const totalWins = getTotalWins(winningNumbers, playingNumbers)
        let currentResult = totalWins > 0 ? 1 : 0
        for (let i = 2; i <= totalWins; i++) {
            currentResult *= 2
        }

        result += currentResult
    })

    return result
}

function getTotalWins(winningNumbers, playingNumbers) {
    const filteredNumbers = winningNumbers.filter(function (n) {
        return playingNumbers.indexOf(n) !== -1;
    })

    return filteredNumbers.length
}

function part2(appenededGames, result) {
    if (appenededGames.length === 0) {
        return result
    }

    result += appenededGames.length

    const newAppenededGames = []
    appenededGames.forEach(({ gameId, winningNumbers, playingNumbers }) => {
        const totalWins = getTotalWins(winningNumbers, playingNumbers)
        for (let i = 1; i <= totalWins; i++) {
            const appendedGame = numbersGrid.find(v => v.gameId === gameId + i)
            if (appendedGame) {
                newAppenededGames.push(appendedGame)
            }
        }
    })

    return part2(newAppenededGames, result)
}

function getResult(isSecondPart = false) {
    if (isSecondPart) {
        return part2(numbersGrid, 0);
    }

    return part1()
}

export default returnResult(getResult(), getResult(true), timer)