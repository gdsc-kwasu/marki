const http = require('http')
require('./kernel')
const app = require('./app')

const server = http.createServer(app)

server.listen(4000)
