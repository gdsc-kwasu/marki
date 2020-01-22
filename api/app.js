const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./config/passport')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get(
  '/',
  passport.authenticate('register', { session: false }),
  (req, res, next) => res.json({ user: req.user })
)

// User (administrator) route
app.use('/user', require('./routes/user'))
// Attendee search route level.
app.use('/search', require('./routes/search'))
// Attendee routes
app.use('/attendee', require('./routes/attendee'))

module.exports = app
