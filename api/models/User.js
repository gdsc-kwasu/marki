const mongoose = require('mongoose')

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

const User = mongoose.model('user', userSchema)

module.exports = User
