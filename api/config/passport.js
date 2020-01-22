const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function(email, password, done) {
      User.findOne({ email })
        .then(user => {
          if (!user)
            return done(new Error('Auth failed'), { message: 'No user found' })
          // if (user.verifyPassword(password))
          //   return done(null, user, { message: 'Auth successful' })

          console.log
          return done(null, user)
          return done(
            new Error('Auth failed'),
            false,
            'Email or password does not match'
          )
        })
        .catch(error => done(error))
    }
  )
)

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
