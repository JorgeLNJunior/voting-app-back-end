const router = require('express').Router()
const upload = require('multer')()

const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

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
router.post('/surveys/:id/banner', upload.single('banner'), SurveyController.updateBanner)

// user routes
router.get('/users/', UserController.show)
router.get('/users/:id/votes', UserController.getUserVotes)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)
router.post('/users/:id/password', UserController.updatePassword)
router.post('/users/:id/avatar', upload.single('avatar'), UserController.updateAvatar)

module.exports = router
