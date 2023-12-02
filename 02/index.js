import { getInput, returnResult } from '../helper.js'

const input = getInput(2)

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
}

function getIdIfPossible(gameCubes, id) {
    if (gameCubes.every(cube =>
        cube.red <= maxCubes.red &&
        cube.green <= maxCubes.green &&
        cube.blue <= maxCubes.blue)
    ) {
        return id
    }
    return 0
}

function getFewestCubes(gameCubes) {
    const colors = ['red', 'green', 'blue']
    const fewestCubesColors = gameCubes.reduce((acc, cube) => {
        colors.forEach(color => {
            if (cube[color] > acc[color]) {
                acc[color] = cube[color]
            }
        })

        return acc
    }, { red: 0, green: 0, blue: 0 })
    return fewestCubesColors.red * fewestCubesColors.green * fewestCubesColors.blue
}

function getLineGameCubes(gameLine) {
    const [gameId, gameData] = gameLine.split(':')
    const id = Number(gameId.replace('Game ', ''))

    const gameSets = gameData.split(';')
    const gameCubes = gameSets.map(set => {
        const splitSet = set.trim().split(',')
        const cube = { red: 0, green: 0, blue: 0 }
        for (const cubeData of splitSet) {
            const [count, color] = cubeData.trim().split(' ')
            cube[color] += Number(count)
        }

        return cube
    })

    return { gameCubes, id }
}

function getResult(isSecondPart = false) {
    let result = 0

    for (const gameLine of input) {
        const { gameCubes, id } = getLineGameCubes(gameLine)

        result += isSecondPart ?
            getFewestCubes(gameCubes) :
            getIdIfPossible(gameCubes, id)
    }

    return result
}

export default returnResult(getResult(), getResult(true))