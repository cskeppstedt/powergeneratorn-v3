const fs = require('fs')
const program = require('commander')
const version = require('./package.json').version
const generate = require('./src/generate')
const build = require('./src/build')
const tokenize = require('./src/tokenize')

function defaultRandomInt (maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive + 1))
}

program
  .version(version)
  .option('-n, --num-words <n>', 'Number of words to generate')
  .option('-i, --input-file <file>', 'Path to an input file with training data')
  .parse(process.argv)

console.info('Reading input file:', program.inputFile)

fs.readFile(program.inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return process.exit(1)
  }

  console.info('Done.')
  console.info('Generating text of length:', program.numWords)

  const prefixLength = 3
  const tokens = tokenize(data)
  const map = build(tokens, prefixLength)
  const text = generate(defaultRandomInt, map, program.numWords, true)

  console.log(text)
})
