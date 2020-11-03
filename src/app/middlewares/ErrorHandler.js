const { GeneralError } = require('../helpers/Errors')
const multer = require('multer')

module.exports = function (err, req, res) {
  console.log(err)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message })
  }
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({ error: err.message })
  } else {
    return res.status(500).json({ error: 'internal error' })
  }
}
