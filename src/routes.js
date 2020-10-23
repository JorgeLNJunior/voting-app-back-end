const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

const bcrypt = require('bcryptjs')
const User = require('./app/models/User')
const { InvalidCredentialError } = require('./app/helpers/Errors')

// auth routes
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// no required auth routes
router.get('/surveys', SurveyController.show)

router.use(AuthMiddleware)

// survey routes
router.post('/surveys', SurveyController.create)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)
router.put('/surveys/:id', SurveyController.update)
router.delete('/surveys/:id', SurveyController.delete)

// user routes
router.get('/users/', UserController.show)
router.put('/users/:id', UserController.edit)
router.delete('/users/:id', UserController.delete)
router.post('/users/:id/password', async (req, res, next) => {
  const { id } = req.params
  const { oldPassword, newPassword } = req.body

  try {
    var user = await User.show({ id })

    if (!await bcrypt.compare(oldPassword, user[0].password)) {
      throw new InvalidCredentialError('wrong password')
    }

    const password = await bcrypt.hash(newPassword, 10)

    user = await User.update(id, { password })

    return res.json({ user })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
