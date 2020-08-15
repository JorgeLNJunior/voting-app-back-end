const express = require('express')
const path = require('path')
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
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express
