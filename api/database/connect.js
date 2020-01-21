const mongoose = require('mongoose')

/**
 * Connect to the database at the given URI
 */
module.exports = uri => {
  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongoose Database connected'))
    .catch(error => console.error('Database connection failed: ' + error))
}
