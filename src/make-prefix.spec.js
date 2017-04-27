const makePrefix = require('./make-prefix')

test('prefixLength is mandatory', () => {
  const fn = () => makePrefix()
  expect(fn).toThrowError('Specify a prefix length > 0')
})

test('empty input creates a prefix with only spaces', () => {
  expect(makePrefix(3).key()).toEqual(['', '', ''].join(' '))
})

test('pushing adds the word to the key', () => {
  const prefix = makePrefix(3)
  prefix.push('dragon')
  expect(prefix.key()).toEqual(['', '', 'dragon'].join(' '))
})

test('pushing multiple words advances the key by pushing out old words', () => {
  const prefix = makePrefix(3)

  prefix.push('dragon')
  prefix.push('lord')
  expect(prefix.key()).toEqual(['', 'dragon', 'lord'].join(' '))

  prefix.push('doom')
  expect(prefix.key()).toEqual(['dragon', 'lord', 'doom'].join(' '))
})

test('providing an initial word argument is the same as pushing the word', () => {
  const pushedPrefix = makePrefix(2)
  pushedPrefix.push('warrior')

  const singleArgPrefix = makePrefix(2, 'warrior')
  expect(pushedPrefix.key()).toEqual(singleArgPrefix.key())
})

test('providing all initial words is the same as pushing the words', () => {
  const pushedPrefix = makePrefix(2)
  pushedPrefix.push('warrior')
  pushedPrefix.push('master')

  const allArgsPrefix = makePrefix(2, 'warrior', 'master')
  expect(pushedPrefix.key()).toEqual(allArgsPrefix.key())
})

test('exposes a function that parses from a key', () => {
  const key = 'warrior master'
  const prefix = makePrefix.fromKey(key, 2)
  expect(prefix.key()).toEqual(key)
})
