const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    greetings: 'Hello World'
  })
})

app.use('/search', require('./routes/search'))

module.exports = app
