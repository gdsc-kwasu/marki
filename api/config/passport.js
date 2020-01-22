const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

/**
 * Local strategy for signing user (administrators) In
 *
 */
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function(email, password, done) {
      const err = new Error('authentication failed')

      User.findOne({ email })
        .then(user => {
          if (!user) return done(err)
          user
            .verifyPassword(password)
            .then(res => {
              return res ? done(null, user) : done(err, false)
            })
            .catch(error => done(error))
        })
        .catch(error => done(error))
    }
  )
)

/**
 * JWT Strategy for verifying Token authentication claims.
 *
 */
passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'jwt-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    function(jwt_payload, done) {
      done(null, jwt_payload)
    }
  )
)
