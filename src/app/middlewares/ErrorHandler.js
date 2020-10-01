const { GeneralError } = require('../helpers/Errors')

module.exports = function (err, req, res, next) {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({ error: err.message })
  } else {
    return res.status(500).json({ error: 'internal error' })
  }
}
