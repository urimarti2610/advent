import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(8)

const GO = { L: {}, R: {} };
const steps = input.shift()

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function lcm(xs) {
    let ans = 1;
    xs.forEach((x) => {
        ans = (x * ans) / gcd(x, ans);
    });
    return ans;
}

input.forEach((line) => {
    if (!line) return

    const [st, lr] = line.split('=');
    const trimmedSt = st.trim();
    const [left, right] = lr.split(',');
    const trimmedLeft = left.trim().slice(1).trim();
    const trimmedRight = right.slice(0, -1).trim();
    GO['L'][trimmedSt] = trimmedLeft;
    GO['R'][trimmedSt] = trimmedRight;
});

function solve(part2 = false) {
    const POS = [];
    for (const s in GO['L']) {
        if (part2 ? s.endsWith('A') : s.endsWith('AAA')) {
            POS.push(s);
        }
    }
    const T = {};
    let t = 0;
    while (true) {
        const NP = [];
        for (let i = 0; i < POS.length; i++) {
            let p = GO[steps[t % steps.length]][POS[i]];
            if (p.endsWith('Z')) {
                T[i] = t + 1;
                if (Object.keys(T).length === POS.length) {
                    console.log(Object.values(T));
                    return lcm(Object.values(T));
                }
            }
            NP.push(p);
        }
        POS.splice(0, POS.length, ...NP);
        t++;
    }
}

export default returnResult(solve(), solve(true), timer)