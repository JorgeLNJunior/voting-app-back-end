const router = require('express').Router()
const upload = require('multer')()

const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

const Storage = require('./app/helpers/Storage/AzureStorage')
const User = require('./app/models/User')

// auth routes
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// no required auth routes
router.get('/surveys', SurveyController.show)

router.post('/users/:id/avatar', upload.single('avatar'), async (req, res, next) => {
  const { id } = req.params
  try {
    const fileUrl = await Storage.storeAvatar(req.file)
    const user = await User.update(id, { avatar: fileUrl })
    return res.json({ user })
  } catch (error) {
    next(error)
  }
})

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
router.post('/users/:id/password', UserController.updatePassword)

module.exports = router
