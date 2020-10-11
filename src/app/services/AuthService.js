const jwt = require('jsonwebtoken')
const moment = require('moment')

class AuthService {
  generateToken (userID) {
    return jwt.sign({
      uid: userID,
      expiresIn: moment().add(5, 'days')
    }, process.env.APP_SECRET, { expiresIn: '5d' })
  }
}

module.exports = new AuthService()
