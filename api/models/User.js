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
2
userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

userSchema.methods.verifyPassword = function(password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
