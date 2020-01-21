const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
  res.json({
    greetings: 'Hello World'
  })
})

module.exports = app
