const makePrefix = require('./make-prefix')

function maxInclusive (choices) {
  return choices.length - 1
}

function pick (randomInt, choices) {
  return choices[randomInt(maxInclusive(choices))]
}

module.exports = (randomInt, map, numWords) => {
  const prefix = makePrefix(map.prefixLength())
  const words = []

  for(let i=0; i<numWords; i++) {
    const choices = map.choicesFor(prefix)

    if (choices.length === 0) {
      break
    }

    const word = pick(randomInt, choices)
    prefix.push(word)
    words.push(word)
  }

  return words.join(' ')
}

