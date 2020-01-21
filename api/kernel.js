const dbConnect = require('./database/connect')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connect to database.
dbConnect('mongodb://127.0.0.1:27017/marki')
require('./database/boot')
