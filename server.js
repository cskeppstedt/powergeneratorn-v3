const AWS = require('aws-sdk')
const concat = require('concat-stream')
const express = require('express')
const fs = require('fs')
const randomSeed = require('random-seed')

const build = require('./src/build')
const generate = require('./src/generate')
const tokenize = require('./src/tokenize')

const PREFIX_LENGTH = 3
const {
  NODE_ENV,
  PORT,
  AWS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_INPUT_FILE_BUCKET,
  S3_INPUT_FILE_KEY,
  INPUT_FILE
} = process.env

function getInputFileReadStream () {
  // read from S3 in prod, but from local file when developing
  if (NODE_ENV !== 'production') {
    console.info('  > Creating input read stream from local file: ' + INPUT_FILE)
    return fs.createReadStream(INPUT_FILE)
  }

  console.info('  > Creating input read stream from S3')
  const s3client = new AWS.S3({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  })
  return s3client.getObject({
    Bucket: S3_INPUT_FILE_BUCKET,
    Key: S3_INPUT_FILE_KEY
  }).createReadStream()
}

function buildMap (inputReadStream) {
  console.info('  > Reading data from input read stream')

  return new Promise((resolve, reject) => {
    const concatStream = concat({ encoding: 'string' }, (data) => {
      console.info('  > Tokenizing and building chain map')
      const map = build(tokenize(data), PREFIX_LENGTH)
      console.info(`  > Chain map contains ${map.keys().length} unique keys`)
      resolve(map)
    })

    inputReadStream.on('error', (err) => reject(err))
    inputReadStream.pipe(concatStream)
  })
}

function startServer (map) {
  console.info('  > Starting Express server')
  return new Promise((resolve, reject) => {
    const app = express()
    app.get('/prophecy', (req, res) => res.send(prophecy(map, req.query.seed)))
    app.use(express.static('static'))
    app.listen(PORT, (...args) => {
      console.info(`  > Express server started: http://0.0.0.0:${PORT}`)
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

  for (let i = 0; i < numSentences; i++) {
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
buildMap(getInputFileReadStream())
  .then(startServer)
  .catch((err) => {
    console.error(err.toString())
    process.exit(1)
  })
