const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      required: true
    },
    attendeeId: mongoose.Schema.Types.ObjectId
  },
  /**
   * Extra configuration for mongoose
   */
  { timestamps: true }
)

const Attendance = mongoose.model('attendance', attendanceSchema)

module.exports = Attendance
