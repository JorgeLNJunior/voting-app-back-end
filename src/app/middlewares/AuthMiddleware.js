const jwt = require('jsonwebtoken')
const promisify = require('util').promisify

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({ error: 'token not provided' })
  }

  const [, token] = auth.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.UID = decoded.UID
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' })
  }
  return next()
}
