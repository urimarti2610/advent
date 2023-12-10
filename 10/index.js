import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(10)

const grid = input.map((row) => row.split(''));

const rows = grid.length;
const columns = grid[0].length;

let startRow, startColumn, startDirection;
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        if (grid[r][c] === 'S') {
            startRow = r;
            startColumn = c;
            const isUpValid = ['|', '7', 'F'].includes(grid[r - 1][c]);
            const isRightValid = ['-', '7', 'J'].includes(grid[r][c + 1]);
            const isDownValid = ['|', 'L', 'J'].includes(grid[r + 1][c]);
            const left_valid = ['-', 'L', 'F'].includes(grid[r][c - 1]);
            const validCount = [isUpValid, isRightValid, isDownValid, left_valid].filter(Boolean).length;

            if (validCount !== 2) {
                throw new Error('Invalid configuration');
            }

            if (isUpValid && isDownValid) {
                grid[r][c] = '|';
                startDirection = 0;
            } else if (isUpValid && isRightValid) {
                grid[r][c] = 'L';
                startDirection = 0;
            } else if (isUpValid && left_valid) {
                grid[r][c] = 'J';
                startDirection = 0;
            } else if (isDownValid && isRightValid) {
                grid[r][c] = 'F';
                startDirection = 2;
            } else if (isDownValid && left_valid) {
                grid[r][c] = '7';
                startDirection = 2;
            } else if (left_valid && isRightValid) {
                grid[r][c] = '-';
                startDirection = 1;
            } else {
                throw new Error('Invalid configuration');
            }

        }
    }
}

const rowMovements = [-1, 0, 1, 0];
const columnMovements = [0, 1, 0, -1];

const rows2 = 3 * rows;
const columns2 = 3 * columns;
const grid2 = Array.from({ length: rows2 }, () => Array.from({ length: columns2 }, () => '.'));
const X_SYMBOL = 'x'

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        const pipe = grid[r][c];

        const col = 3 * c
        const row = 3 * r


        if (pipe === '|') {
            grid2[row][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row + 2][col + 1] = X_SYMBOL;
        } else if (pipe === '-') {
            grid2[row + 1][col] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 2] = X_SYMBOL;
        } else if (pipe === '7') {
            grid2[row + 1][col] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row + 2][col + 1] = X_SYMBOL;
        } else if (pipe === 'F') {
            grid2[row + 2][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 2] = X_SYMBOL;
        } else if (pipe === 'J') {
            grid2[row + 1][col] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row][col + 1] = X_SYMBOL;
        } else if (pipe === 'L') {
            grid2[row][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 1] = X_SYMBOL;
            grid2[row + 1][col + 2] = X_SYMBOL;
        } else if (pipe === '.') {
            // do nothing
        } else {
            throw new Error('Invalid pipe type');
        }
    }
}

const queue = [];
const visitedCoordinates = new Set();

for (let r = 0; r < rows2; r++) {
    queue.push([r, 0]);
    queue.push([r, columns2 - 1]);
}
for (let c = 0; c < columns2; c++) {
    queue.push([0, c]);
    queue.push([rows2 - 1, c]);
}


while (queue.length > 0) {
    const [r, c] = queue.shift();
    const pos = `${r},${c}`;

    if (visitedCoordinates.has(pos)) {
        continue;
    }

    if (!(r >= 0 && r < rows2 && c >= 0 && c < columns2)) {
        continue;
    }

    visitedCoordinates.add(pos);

    if (grid2[r][c] === X_SYMBOL) {
        continue;
    }

    for (let d = 0; d < 4; d++) {
        queue.push([r + rowMovements[d], c + columnMovements[d]]);
    }
}



function part1() {
    let row = startRow;
    let column = startColumn;
    let distance = 0;
    while (true) {
        distance++;
        row += rowMovements[startDirection];
        column += columnMovements[startDirection];

        const current = grid[row][column]

        if (current === 'L') {
            if (![2, 3].includes(startDirection)) {
                break;
            } else if (startDirection === 2) {
                startDirection = 1;
            } else {
                startDirection = 0;
            }
        }

        if (current === 'J') {
            if (![1, 2].includes(startDirection)) {
                break;
            } else if (startDirection === 1) {
                startDirection = 0;
            } else {
                startDirection = 3;
            }
        }

        if (current === '7') {
            if (![0, 1].includes(startDirection)) {
                break;
            } else if (startDirection === 0) {
                startDirection = 3;
            } else {
                startDirection = 2;
            }
        }

        if (current === 'F') {
            if (![0, 3].includes(startDirection)) {
                break;
            } else if (startDirection === 0) {
                startDirection = 1;
            } else {
                startDirection = 2;
            }
        }

        if (current === '.') {
            throw new Error('Invalid path');
        }

        if (row === startRow && column === startColumn) {
            return Math.floor(distance / 2);
        }
    }
}

function part2() {
    let result = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let seen = false;
            for (let rr = 0; rr < 3; rr++) {
                for (let cc = 0; cc < 3; cc++) {
                    const coord = [3 * r + rr, 3 * c + cc].join(',');
                    if (visitedCoordinates.has(coord)) {
                        seen = true;
                    }
                }
            }
            if (!seen) {
                result++;
            }
        }
    }

    return result
}

export default returnResult(part1(), part2(), timer)