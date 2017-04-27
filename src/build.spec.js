const build = require('./build')
const tokenize = require('./tokenize')
const makePrefix = require('./make-prefix')

test('exposes prefixLength()', () => {
  const map = build(null, 5)
  expect(map.prefixLength()).toEqual(5)
})

test('empty input generates empty map (only one key, empty)', () => {
  const input = null
  const map = build(input)
  const expected = [' ']
  const actual = map.keys()
  expect(actual).toEqual(expected)
})

test('single word input generates map with single plus empty key', () => {
  const input = tokenize('warrior')
  const map = build(input)
  const expected = [' ', 'warrior']
  const actual = map.keys()
  expect(actual).toEqual(expected)
})

test('single word input generates a choice for empty prefix', () => {
  const input = tokenize('warrior')
  const map = build(input)
  const prefix = makePrefix(map.prefixLength())
  expect(map.choicesFor(prefix)).toEqual(['warrior'])
})

test('multiple word input generates a map with all prefixes choices', () => {
  const input = tokenize(
    'He\'s the warrior, the master. ' +
    'He\'s the warrior, the master of disaster!'
  )
  const map = build(input)
  const choicesFor = (...words) => map.choicesFor(makePrefix(map.prefixLength(), ...words))

  expect(map.keys()).toEqual([' ', 'He\'s', 'the', 'warrior,', 'master.', 'master', 'of', 'disaster!'])
  expect(choicesFor('', '')).toEqual(['He\'s'])
  expect(choicesFor('', 'He\'s')).toEqual(['the'])
  expect(choicesFor('He\'s', 'the')).toEqual(['warrior,', 'warrior,'])
  expect(choicesFor('the', 'warrior,')).toEqual(['the', 'the'])
  expect(choicesFor('warrior,', 'the')).toEqual(['master.', 'master'])
  expect(choicesFor('the', 'master.')).toEqual(['He\'s'])
  expect(choicesFor('master.', 'He\'s')).toEqual(['the'])
  expect(choicesFor('the','master')).toEqual(['of'])
  expect(choicesFor('master', 'of')).toEqual(['disaster!'])
  expect(choicesFor('of', 'disaster!')).toEqual([])
})

test('the map supports other prefix lengths', () => {
  const input = tokenize(
    'He\'s the warrior, the master. ' +
    'He\'s the warrior, the master of disaster!'
  )
  const map = build(input, 3)
  const choicesFor = (...words) => map.choicesFor(makePrefix(map.prefixLength(), ...words))

  expect(map.keys()).toEqual([' ', 'He\'s', 'the', 'warrior,', 'master.', 'master', 'of', 'disaster!'])
  expect(choicesFor('', '', '')).toEqual(['He\'s'])
  expect(choicesFor('', '', 'He\'s')).toEqual(['the'])
  expect(choicesFor('', 'He\'s', 'the')).toEqual(['warrior,'])
  expect(choicesFor('He\'s', 'the', 'warrior,')).toEqual(['the', 'the'])
  expect(choicesFor('the', 'warrior,', 'the')).toEqual(['master.', 'master'])
  expect(choicesFor('warrior,', 'the', 'master.')).toEqual(['He\'s'])
  expect(choicesFor('the', 'master.', 'He\'s')).toEqual(['the'])
  expect(choicesFor('master.', 'He\'s', 'the')).toEqual(['warrior,'])
  expect(choicesFor('warrior,', 'the', 'master')).toEqual(['of'])
  expect(choicesFor('the', 'master', 'of')).toEqual(['disaster!'])
})

