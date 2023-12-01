import { getInput, returnResult } from '../helper.js'

const input = getInput(0)

function getResult(isSecondPart = false) {
    // Add Logic Here
    return isSecondPart ? input.length : 0
}

export default returnResult(getResult(), getResult(true))