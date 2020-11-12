const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('mongoose-morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./app/middlewares/ErrorHandler')
require('dotenv').config()

const app = express()

const limiter = rateLimit({
  windowMs: 60000,
  max: process.env.NODE_ENV === 'test' ? 200 : 30,
  message: { error: 'too many requests, please try again later' }
})

app.use(express.json())
app.use(limiter)
app.use(express.static(path.resolve(`${__dirname}/public`))) // eslint-disable-line
app.use(cors())
app.use(helmet())
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  app.use(morgan({ connectionString: process.env.MONGO_CONNECTION_STRING },
    {},
    'combined'
  ))
}
app.use(require('./routes'))
app.use(errorHandler)

module.exports = app
