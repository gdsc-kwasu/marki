const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
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
        process.env.JWT_SECRET
      )
      res.json({
        token,
        status: true
      })
    })
  })(req, res, next)
}
