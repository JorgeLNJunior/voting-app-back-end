const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const User = require('./app/models/User')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(AuthMiddleware)

router.post('/surveys', SurveyController.create)
router.get('/surveys/:id', SurveyController.show)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)

router.get('/users/:id', UserController.getByID)
router.put('/users/:id', async (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    return res.status(400).json({ error: 'invalid params' })
  }
  const data = {}
  if (name) {
    data.name = name
  }
  if (password) {
    data.password = password
  }
  try {
    const user = await User.update(req.UID, data)
    return res.json({ user: user })
  } catch (error) {
    return res.status(500).json({ error: 'internal error' })
  }
})

module.exports = router
