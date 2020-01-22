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
    }
  },
  /**
   * Extra configuration for mongoose
   */
  { timestamps: true }
)
2
userSchema.pre('save', async function(next) {
  const user = this
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

userSchema.methods.verifyPassword = async function(password) {
  const user = this
  const compared = bcrypt.compare(password, user.password)

  return compared
}

const User = mongoose.model('user', userSchema)

module.exports = User
