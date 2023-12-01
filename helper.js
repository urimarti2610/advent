import fs from 'fs'

export function returnResult(result_1, result_2) {
    return { result_1, result_2 }
}

export function getInput(day, splitBy = '\n') {
    if (day.toString().length === 1) {
        day = `0${day}`
    }

    return fs.readFileSync(`./${day}/input.txt`, 'utf8').split(splitBy)
}