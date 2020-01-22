const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  /**
   * Extra configuration for mongoose
   */
  { timestamps: true }
)

/**
 * Hash the password before saved to the DB.
 *
 */
userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

/**
 * Helper function on User model to verify if given
 * password match the hashed password.
 *
 */
userSchema.methods.verifyPassword = function(password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
