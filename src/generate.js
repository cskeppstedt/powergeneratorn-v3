const makePrefix = require('./make-prefix')

function maxInclusive (choices) {
  return choices.length - 1
}

function pickChoice (randomInt, choices) {
  return choices[randomInt(maxInclusive(choices))]
}

function pickPrefix (randomInt, map) {
  const choices = Object.keys(map.map())
  const key = pickChoice(randomInt, choices)
  return makePrefix.fromKey(key, map.prefixLength())
}

function normalize (word) {
  return /The/.test(word)
    ? 'the'
    : word
}

function capitalize (sentence) {
  if (!sentence) {
    return sentence
  }

  return sentence[0].toUpperCase() + sentence.substring(1)
}

function terminate (sentence) {
  if (!sentence) {
    return ''
  }

  if (/,$/.test(sentence)) {
    return sentence.substring(0, sentence.length - 1) + '.'
  }

  if (/[!?]$/.test(sentence)) {
    return sentence
  }

  if (!/\.$/.test(sentence)) {
    return sentence + '.'
  }

  return sentence
}

module.exports = (randomInt, map, numWords, useRandomStart = false) => {
  const prefix = useRandomStart
    ? pickPrefix(randomInt, map)
    : makePrefix(map.prefixLength())

  const words = []

  for (let i = 0; i < numWords; i++) {
    const choices = map.choicesFor(prefix)

    if (choices.length === 0) {
      break
    }

    const word = pickChoice(randomInt, choices)
    prefix.push(word)

    if (words.length === 0) {
      words.push(word)
    } else {
      words.push(normalize(word))
    }

    if (/\.$/.test(word)) {
      break
    }
  }

  return terminate(capitalize(words.join(' ')))
}
