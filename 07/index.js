import { getInput, returnResult } from '../helper.js';
import { Timer } from '../timer.js';
const timer = new Timer()

const input = getInput(7)

const JOKER = 0

function setUpGrid(jokers = false) {
    const grid = []
    const letters = {
        'A': 14,
        'K': 13,
        'Q': 12,
        'J': jokers ? JOKER : 11,
        'T': 10,
    }

    input.forEach(hand => {
        const [cardsData, bidString] = hand.split(' ')
        const bid = Number(bidString)

        const numberCards = cardsData.split('').map(v => {
            return letters[v] ?? Number(v)
        })

        const sets = {}
        numberCards.forEach(card => {
            if (!sets[card]) {
                sets[card] = { card, total: 0 }
            }
            sets[card].total += 1
        })

        const jokerNumbers = numberCards.filter(v => v === JOKER).length

        let cards = Object.values(sets).sort((a, b) => {
            return b.total - a.total || b.card - a.card
        })

        if (jokerNumbers > 0) {
            cards = cards.filter(v => v.card !== JOKER)

            if (!cards[0]) {
                cards[0] = {
                    card: JOKER,
                    total: 0,
                }
            }

            cards[0].total += jokerNumbers
        }

        const puntuation = getPuntuationByCards(cards)

        const orderedSets = {
            bid,
            cards: numberCards,
            puntuation
        }

        grid.push(orderedSets)
    })

    grid.sort(sortGrid)

    for (let i = 0; i < grid.length; i++) {
        grid[i].rank = grid.length - i
    }

    return grid
}

function sortGrid(a, b) {
    const puntuation = b.puntuation - a.puntuation
    if (puntuation !== 0) return puntuation

    for (let i = 0; i < a.cards.length; i++) {
        const result = b.cards[i] - a.cards[i]

        if (result !== 0) return result
    }

    return 0
}

function getPuntuationByCards(cards) {
    // Five of a kind
    if (cards.length === 1) return 7

    // Four of a kind
    if (cards[0].total === 4) return 6

    // Full house
    if (cards[0].total === 3 && cards[1].total === 2) return 5

    // Three of a kind
    if (cards[0].total === 3) return 4

    // Two pair
    if (cards[0].total === 2 && cards[1].total === 2) return 3

    // One pair
    if (cards[0].total === 2) return 2

    // High card
    return 1
}

function getTotal(grid) {
    return grid.reduce((acc, { rank, bid }) => acc + (rank * bid), 0)
}

function part1() {
    return getTotal(setUpGrid())
}

function part2() {
    return getTotal(setUpGrid(true))
}

export default returnResult(part1(), part2(), timer)