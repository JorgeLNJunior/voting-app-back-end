const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const User = require('./app/models/User')
const { ResourceNotFoundError } = require('./app/helpers/Errors')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(AuthMiddleware)

router.post('/surveys', SurveyController.create)
router.get('/surveys/:id', SurveyController.show)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)

router.get('/users/:id', UserController.getByID)
router.put('/users/:id', UserController.edit)
router.delete('/users/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.getByID(id)
    if (!user) {
      throw new ResourceNotFoundError('user not found')
    }
    await User.delete(id)
    return res.json({ message: 'user has been deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
