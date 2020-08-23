const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('mongoose-morgan')
require('dotenv').config()

class AppController {
  constructor () {
    this.express = express()
    this.middlewares = this.middlewares()
    this.routes = this.routes()
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(express.static(path.resolve(`${__dirname}/public`)))
    this.express.use(cors())
    this.express.use(morgan(
      { connectionString: process.env.MONGO_CONNECTION_STRING },
      {},
      'combined'
    ))
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
