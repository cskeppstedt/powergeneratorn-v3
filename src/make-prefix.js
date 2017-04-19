module.exports = (prefixLength, ...initialWords) => {
  if (!prefixLength) {
    throw new Error('Specify a prefix length > 0')
  }

  const prefixTokens = []
  const push = (word) => {
    prefixTokens.shift()
    prefixTokens.push(word)
  }

  for (let i=0; i<prefixLength; i++) {
    prefixTokens.push('')
  }

  initialWords.forEach(push)

  return {
    key: () => prefixTokens.join(' '),
    push: push
  }
}

