const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    faculty: {
      type: String,
      required: true
    },
    additional: {
      type: Object
    }
  },
  /**
   * Extra configuration for mongoose
   */
  { timestamps: true }
)

const Attendee = mongoose.model('attendee', attendeeSchema)

module.exports = Attendee
