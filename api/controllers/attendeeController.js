const mongoose = require('mongoose')

const Attendee = mongoose.model('attendee')
const Attendance = mongoose.model('attendance')

/**
 * Get the record of all attendees
 */
exports.getAll = (req, res, next) => {
  Attendee.find({})
    .then(attendees => {
      res.json({
        data: attendees,
        status: true
      })
    })
    .catch(error => {
      next(error)
    })
}

/**
 * Get an Attendee by their ID (Mongoose ID)
 */
exports.getById = (req, res, next) => {
  Attendee.findOne({ _id: req.params.id })
    .then(attendee => {
      if (!attendee) throw new Error('Attendee not found')

      res.json({
        data: attendee,
        status: true
      })
    })
    .catch(error => next(error))
}

/**
 * Create a new Attendee record
 */
exports.create = (req, res, next) => {
  const data = req.body
  Attendee.create(data).then(attendee => {
    res
      .json({
        data: attendee,
        status: true
      })
      .catch(error => next(error))
  })
}

/**
 * Create an attendance (as present<true> or absent<false>) for an attendee
 */
exports.markAttendance = (status = true) => {
  return (req, res, next) => {
    const attendeeId = req.params.id
    console.log(attendeeId)
    Attendee.findById(attendeeId)
      .then(attendee => {
        Attendance.create({
          status,
          attendeeId
        }).then(attendance => {
          res
            .json({
              data: attendance,
              status: true
            })
            .catch(error => next(error))
        })
      })
      .catch(error => next(error))
  }
}

/**
 * Delete the record of an attendee and all their attendance record(s).
 */
exports.delete = (req, res, next) => {
  const attendeeId = req.params.id
  Promise.all([
    Attendee.findByIdAndDelete(attendeeId),
    Attendance.deleteMany({ attendeeId })
  ])
    .then(() => {
      res.json({ status: true })
    })
    .catch(error => next(error))
}
