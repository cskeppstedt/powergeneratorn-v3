const generate = require('./generate')
const build = require('./build')
const tokenize = require('./tokenize')

test('empty map generates empty string', () => {
  const map = build(tokenize(''))
  const randomInt = (maxInclusive) => maxInclusive
  const expected = ''
  const numWords = 5
  const actual = generate(randomInt, map, numWords)
})

test('uses randomInt to generate n word sentences', () => {
  const map = build(tokenize('the first the second the first again the second again'))
  const expected = 'the first again the'
  const numWords = 4
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

