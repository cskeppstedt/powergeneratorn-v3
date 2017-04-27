const generate = require('./generate')
const build = require('./build')
const tokenize = require('./tokenize')

test('empty map generates empty string', () => {
  const map = build(tokenize(''))
  const randomInt = (maxInclusive) => maxInclusive
  const expected = ''
  const numWords = 5
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('randomizes an n-word sentence and terminates .', () => {
  const map = build(tokenize('the first the second the first again the second again'))
  const expected = 'The first again the.'
  const numWords = 4
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('terminates with . if sentence ends with ,', () => {
  const map = build(tokenize('the first, the second the first again the second again'))
  const expected = 'The first.'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('terminates with . if sentence ends with "', () => {
  const map = build(tokenize('the first" the second the first again the second again'))
  const expected = 'The first".'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('terminates with . if sentence ends with \'', () => {
  const map = build(tokenize('the first\' the second the first again the second again'))
  const expected = 'The first\'.'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('preserves terminating .', () => {
  const map = build(tokenize('the first. the second the first again the second again'))
  const expected = 'The first.'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('preserves terminating !', () => {
  const map = build(tokenize('the first! the second the first again the second again'))
  const expected = 'The first!'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('preserves terminating ?', () => {
  const map = build(tokenize('the first? the second the first again the second again'))
  const expected = 'The first?'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('stops if the word terminates with .', () => {
  const map = build(tokenize('the first. the second the first again the second again'))
  const expected = 'The first.'
  const numWords = 4
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('can start at a random prefix', () => {
  const map = build(tokenize('the first the second the first again the second again'))
  const expected = 'Second the.'
  const numWords = 2
  const randomInt = (maxInclusive) => Math.floor(maxInclusive / 2)
  const actual = generate(randomInt, map, numWords, true)
  expect(actual).toEqual(expected)
})

test('preserves capitalization of leading word', () => {
  const map = build(tokenize('The first the second the first again the second again'))
  const expected = 'The first.'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('preserves all-caps in leading word', () => {
  const map = build(tokenize('THE first the second the first again the second again'))
  const expected = 'THE first.'
  const numWords = 2
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})

test('decapitalizes The (when not the leading word)', () => {
  const map = build(tokenize('The first The second the first again the second again'))
  const expected = 'The first the second.'
  const numWords = 4
  const randomInt = (maxInclusive) => maxInclusive
  const actual = generate(randomInt, map, numWords)
  expect(actual).toEqual(expected)
})
