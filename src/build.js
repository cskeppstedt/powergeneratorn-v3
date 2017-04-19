const makePrefix = require('./make-prefix')

module.exports = (tokens, prefixLength = 2) => {
  tokens = tokens || []

  const keyMap = {}
  const map = {}
  const keys = [' ']
  const prefix = makePrefix(prefixLength)

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!keyMap[token]) {
      keyMap[token] = true
      keys.push(token)
    }

    if (!map[prefix.key()]) {
      map[prefix.key()] = []
    }

    map[prefix.key()].push(token)
    prefix.push(token)
  }

  return {
    keys: () => keys,
    map: () => map,
    prefixLength: () => prefixLength,
    choicesFor: (prefix) => map[prefix.key()] || []
  }
}
