const mongoose = require('mongoose')
require('./boot')

mongoose
  .connect('mongodb://127.0.0.1:27017/marki', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    mongoose.disconnect()
  })
  .catch(error => console.error('Database seeding failed: ' + error))
