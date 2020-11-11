const { GeneralError } = require('../helpers/Errors')
const multer = require('multer')

module.exports = function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    /* istanbul ignore next */
    return res.status(400).json({ error: err.message })
  }
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({ error: err.message })
  } else {
    return res.status(500).json({ error: err.message })
  }
}
