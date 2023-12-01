let day = process.env.DAY;

if (day.length === 1) {
    day = `0${day}`
}

const { default: result } = await import(`./${day}/index.js`)
console.log(`Result for day ${day}:`)
console.log(result)
