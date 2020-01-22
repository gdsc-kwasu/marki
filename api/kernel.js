const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const dbConnect = require('./database/connect')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Connect to database.
dbConnect(process.env.MONGO_DB)
require('./database/boot')
