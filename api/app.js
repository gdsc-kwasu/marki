const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('./config/passport')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user)
      return res.status(400).json({
        message: 'Email or password is incorrect. Try again.',
        error: err.message,
        status: false
      })

    req.login(user, { session: false }, error => {
      if (error) return next(error)
      const { name, email, _id, username } = user
      const token = jwt.sign(
        { user: { _id, name, email, username } },
        'jwt-secret'
      )
      res.json({
        token,
        status: true
      })
    })
  })(req, res, next)
})

app.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user
    })
  }
)

// User (administrator) route
app.use('/user', require('./routes/user'))
// Attendee search route level.
app.use('/search', require('./routes/search'))
// Attendee routes
app.use('/attendee', require('./routes/attendee'))

module.exports = app
