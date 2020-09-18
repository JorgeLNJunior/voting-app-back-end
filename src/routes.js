const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const User = require('./app/models/User')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(AuthMiddleware)

router.post('/surveys', SurveyController.create)
router.get('/surveys/:id', SurveyController.show)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)

router.get('/users/:id', async (req, res) => {
  const user = await User.getByID(req.params.id)
  if (!user) {
    return res.status(400).json({ error: 'user not found' })
  }
  return res.json({ user: user })
})

module.exports = router
