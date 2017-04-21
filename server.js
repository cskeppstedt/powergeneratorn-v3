const express = require('express')
const fs = require('fs')
const randomSeed = require('random-seed')

const generate = require('./src/generate')
const build = require('./src/build')
const tokenize = require('./src/tokenize')

const INPUT_FILE = 'input.txt'
const PREFIX_LENGTH = 3
const SERVER_PORT = process.env.PORT

function buildMap () {
  console.info('  > Reading input file:', INPUT_FILE)
  return new Promise((resolve, reject) => {
    fs.readFile(INPUT_FILE, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }

      console.info('  > Tokenizing and building chain map.')
      const tokens = tokenize(data)
      const map = build(tokens, PREFIX_LENGTH)

      console.info(`  > Chain map contains ${map.keys().length} unique keys.`)
      resolve(map)
    })
  })
}

function startServer (map) {
  console.info('  > Starting Express server.')
  return new Promise((resolve, reject) => {
    const app = express()
    app.get('/prophecy', (req, res) => res.send(prophecy(map, req.query.seed)))
    app.use(express.static('static'))
    app.listen(SERVER_PORT, (...args) => {
      console.info(`  > Express server started: http://0.0.0.0:${SERVER_PORT}`)
      resolve(map)
    })
  })
}

function prophecy (map, seed) {
  seed = seed || JSON.stringify(Math.random())

  const rand = randomSeed.create(seed)
  const randomInt = (maxInclusive) => rand(maxInclusive + 1)
  const numSentences = 3 + randomInt(4)
  const sentences = []

  for (let i=0; i<numSentences; i++) {
    const numWords = 10 + randomInt(20)
    const sentence = generate(randomInt, map, numWords, true)
    sentences.push(sentence)
  }

  return {
    seed,
    sentences
  }
}

// entry-point; build chain-map and start server
buildMap().then(startServer)

