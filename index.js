let day = process.env.DAY;

if (day.length === 1) {
    day = `0${day}`
}

const { default: result } = await import(`./${day}/index.js`)
const title = `### Advent of Code 2023 - Day ${day} ###`

const hashLine = '#'.repeat(title.length)
console.log(hashLine)
console.log(title)
console.log(hashLine)

const spaces = Math.floor((title.length - result.toString().length - 10) / 2)
if (spaces * 2 + result.toString().length + 10 === title.length) {
    console.log('###', ' '.repeat(spaces), result, ' '.repeat(spaces), '###')
} else {
    console.log('###', ' '.repeat(spaces), result, ' '.repeat(spaces + 1), '###')
}

console.log(hashLine)
