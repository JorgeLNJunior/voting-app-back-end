const express = require('express')
require('dotenv').config()

class AppController {
  constructor () {
    this.express = express()
    this.middlewares = this.middlewares()
    this.routes = this.routes()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
