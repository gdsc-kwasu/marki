const mongoose = require('mongoose')

// pull the model off mongoose.
const Attendee = mongoose.model('attendee')

exports.searchByName = (req, res, next) => {
  // Pull the search query
  const searchTerm = req.query.q

  // find the likely attendee name corresponding to the search term.
  Attendee.find({ name: new RegExp(searchTerm, 'i') })
    .then(attendees =>
      res.json({
        data: attendees,
        status: true
      })
    )
    .catch(error => next(error))
}
