import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(9)

function solve(data, isSecondPart) {
    if (data.every((x) => x === 0)) {
        return 0;
    }

    const results = [];
    for (let i = 0; i < data.length - 1; i++) {
        results.push(data[i + 1] - data[i]);
    }

    return data[isSecondPart ? 0 : data.length - 1] + (isSecondPart ? -1 : 1) * solve(results, isSecondPart);
}

function getResult(isSecondPart = false) {
    let result = 0;
    input.forEach((line) => {
        const xs = line.split(' ').map((x) => parseInt(x, 10));
        result += solve(xs, isSecondPart);
    });

    return result
}

function part1() {
    return getResult()
}

function part2() {
    return getResult(true)
}

export default returnResult(part1(), part2(), timer)