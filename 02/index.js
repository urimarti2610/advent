import { getInput, returnResult } from '../helper.js'

const input = getInput(2)

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
}

function getResult(isSecondPart = false) {
    let result = 0
    for (const gameLine of input) {
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

        if (!isSecondPart) {
            // Solution game 1
            if (gameCubes.every(cube =>
                cube.red <= maxCubes.red &&
                cube.green <= maxCubes.green &&
                cube.blue <= maxCubes.blue)
            ) {
                result += id
            }

        } else {

            // Solution game 2
            const fewestCubesColors = gameCubes.reduce((acc, cube) => {
                if (cube.red > acc.red) {
                    acc.red = cube.red
                }

                if (cube.green > acc.green) {
                    acc.green = cube.green
                }

                if (cube.blue > acc.blue) {
                    acc.blue = cube.blue
                }

                return acc
            }, { red: 0, green: 0, blue: 0 })
            const fewestCubes = fewestCubesColors.red * fewestCubesColors.green * fewestCubesColors.blue
            result += fewestCubes

            // console.log({ gameId, id, gameCubes, fewestCubesColors, fewestCubes })
        }
    }

    return result
}

export default returnResult(getResult(), getResult(true))