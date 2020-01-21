const http = require('http')
const app = require('./app')
require('./kernel')

const server = http.createServer(app)

server.listen(4000)
