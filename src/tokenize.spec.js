const tokenize = require('./tokenize')

test('empty/null/undefined string returns empty array', () => {
  const inputs = ['', null, undefined]
  inputs.forEach((input => {
    const expected = []
    expect(tokenize(input)).toEqual(expected)
  }))
})

test('single word is returned as single element array', () => {
  const input = 'dragon'
  const expected = ['dragon']
  expect(tokenize(input)).toEqual(expected)
})

test('single word is trimmed', () => {
  const input = ' dragon  '
  const expected = ['dragon']
  expect(tokenize(input)).toEqual(expected)
})

test('two words are trimmed and returned as 2 element array', () => {
  const input = ' dragon   lord '
  const expected = ['dragon', 'lord']
  expect(tokenize(input)).toEqual(expected)
})

test('capitalization and punctuation is preserved', () => {
  const input = ' the, majestic. Dragon   Lord! '
  const expected = ['the,', 'majestic.', 'Dragon', 'Lord!']
  expect(tokenize(input)).toEqual(expected)
})

test('newlines are ignored', () => {
  const input = "the majestic\nDragon Lord\n\nsoares in the sky"
  const expected = ['the', 'majestic', 'Dragon', 'Lord', 'soares', 'in', 'the', 'sky']
  expect(tokenize(input)).toEqual(expected)
})

