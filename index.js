import fs from 'fs'

const folders = fs.readdirSync('./', { recursive: true })
    .filter(v => v.search('index.js') !== -1 && v !== 'index.js')

const promises = folders.map(async (folder) => {
    const day = folder.split('/')[0]
    const { default: { result_1, result_2, duration } } = await import(`./${folder}`)
    return { day, result_1, result_2, duration }
})

const results = await Promise.all(promises)

console.table(results.reduce((acc, { day, ...x }) => { acc[day] = x; return acc }, {}))