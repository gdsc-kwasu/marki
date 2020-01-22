const mongoose = require('mongoose')
const User = mongoose.model('user')

exports.addUser = (req, res, next) => {
  const data = req.body
  User.create(data)
    .then(user => {
      res.json({
        data: user,
        status: true
      })
    })
    .catch(error => next(error))
}