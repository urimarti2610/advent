import { getInput, returnResult } from '../helper.js'
import { Timer } from '../timer.js'
const timer = new Timer()

const input = getInput(4)

const grid = input.map((row) => {
    const [inputPart1, inputPart2] = row.split('|')
    const numbersPart = inputPart1.split(':')
    const gameId = Number(numbersPart[0].trim().split(' ').filter(v => v !== '')[1])

    const playingNumbers = numbersPart[1].split(' ').map(v => Number(v)).filter(v => v > 0)
    const winningNumbers = inputPart2.split(' ').map(v => Number(v)).filter(v => v > 0)

    const totalWins = winningNumbers.filter(n => playingNumbers.indexOf(n) !== -1).length

    return {
        gameId,
        totalWins,
    }
})

function part1() {
    let result = 0

    grid.forEach(({ totalWins }) => {
        let currentResult = totalWins > 0 ? 1 : 0
        for (let i = 2; i <= totalWins; i++) {
            currentResult *= 2
        }

        result += currentResult
    })

    return result
}

function part2(appenededGames, result = 0) {
    if (appenededGames.length === 0) {
        return result
    }

    result += appenededGames.length

    const newAppenededGames = []

    for (const { gameId, totalWins } of appenededGames) {
        for (let i = 1; i <= totalWins; i++) {
            const appendedGame = grid[gameId + i - 1]
            if (appendedGame) {
                newAppenededGames.push(appendedGame)
            }
        }
    }

    return part2(newAppenededGames, result)
}

function getResult(isFirstPart = true) {
    return isFirstPart ? part1() : part2(grid)
}

export default returnResult(getResult(), getResult(false), timer)