import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(10)

const G = input.map((row) => row.split(''));

const R = G.length;
const C = G[0].length;

let sr, sc, sd;
for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        if (G[r][c] === 'S') {
            sr = r;
            sc = c;
            const up_valid = ['|', '7', 'F'].includes(G[r - 1][c]);
            const right_valid = ['-', '7', 'J'].includes(G[r][c + 1]);
            const down_valid = ['|', 'L', 'J'].includes(G[r + 1][c]);
            const left_valid = ['-', 'L', 'F'].includes(G[r][c - 1]);
            const validCount = [up_valid, right_valid, down_valid, left_valid].filter(Boolean).length;
            if (validCount === 2) {
                if (up_valid && down_valid) {
                    G[r][c] = '|';
                    sd = 0;
                } else if (up_valid && right_valid) {
                    G[r][c] = 'L';
                    sd = 0;
                } else if (up_valid && left_valid) {
                    G[r][c] = 'J';
                    sd = 0;
                } else if (down_valid && right_valid) {
                    G[r][c] = 'F';
                    sd = 2;
                } else if (down_valid && left_valid) {
                    G[r][c] = '7';
                    sd = 2;
                } else if (left_valid && right_valid) {
                    G[r][c] = '-';
                    sd = 1;
                } else {
                    throw new Error('Invalid configuration');
                }
            } else {
                throw new Error('Invalid configuration');
            }
        }
    }
}

const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

const R2 = 3 * R;
const C2 = 3 * C;
const G2 = Array.from({ length: R2 }, () => Array.from({ length: C2 }, () => '.'));

for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        const pipe = G[r][c];
        if (pipe === '|') {
            G2[3 * r][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r + 2][3 * c + 1] = 'x';
        } else if (pipe === '-') {
            G2[3 * r + 1][3 * c] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 2] = 'x';
        } else if (pipe === '7') {
            G2[3 * r + 1][3 * c] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r + 2][3 * c + 1] = 'x';
        } else if (pipe === 'F') {
            G2[3 * r + 2][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 2] = 'x';
        } else if (pipe === 'J') {
            G2[3 * r + 1][3 * c] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r][3 * c + 1] = 'x';
        } else if (pipe === 'L') {
            G2[3 * r][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 1] = 'x';
            G2[3 * r + 1][3 * c + 2] = 'x';
        } else if (pipe === '.') {
            // do nothing
        } else {
            throw new Error('Invalid pipe type');
        }
    }
}

const Q = [];
const SEEN = new Set();

for (let r = 0; r < R2; r++) {
    Q.push([r, 0]);
    Q.push([r, C2 - 1]);
}
for (let c = 0; c < C2; c++) {
    Q.push([0, c]);
    Q.push([R2 - 1, c]);
}


while (Q.length > 0) {
    const [r, c] = Q.shift();
    const pos = `${r},${c}`;
    if (SEEN.has(pos)) {
        continue;
    }
    if (!(r >= 0 && r < R2 && c >= 0 && c < C2)) {
        continue;
    }
    SEEN.add(pos);
    if (G2[r][c] === 'x') {
        continue;
    }
    for (let d = 0; d < 4; d++) {
        Q.push([r + DR[d], c + DC[d]]);
    }
}



function part1() {
    let r = sr;
    let c = sc;
    let dist = 0;
    while (true) {
        dist++;
        r += DR[sd];
        c += DC[sd];
        if (G[r][c] === 'L') {
            if (![2, 3].includes(sd)) {
                break;
            } else if (sd === 2) {
                sd = 1;
            } else {
                sd = 0;
            }
        }
        if (G[r][c] === 'J') {
            if (![1, 2].includes(sd)) {
                break;
            } else if (sd === 1) {
                sd = 0;
            } else {
                sd = 3;
            }
        }
        if (G[r][c] === '7') {
            if (![0, 1].includes(sd)) {
                break;
            } else if (sd === 0) {
                sd = 3;
            } else {
                sd = 2;
            }
        }
        if (G[r][c] === 'F') {
            if (![0, 3].includes(sd)) {
                break;
            } else if (sd === 0) {
                sd = 1;
            } else {
                sd = 2;
            }
        }
        if (G[r][c] === '.') {
            throw new Error('Invalid path');
        }

        if (r === sr && c === sc) {
            return Math.floor(dist / 2);
        }
    }
}

function part2() {
    let result = 0;
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            let seen = false;
            for (let rr = 0; rr < 3; rr++) {
                for (let cc = 0; cc < 3; cc++) {
                    const coord = [3 * r + rr, 3 * c + cc].join(',');
                    if (SEEN.has(coord)) {
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