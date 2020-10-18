const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/surveys', SurveyController.show)

router.use(AuthMiddleware)

router.post('/surveys', SurveyController.create)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)
router.put('/surveys/:id', SurveyController.update)
router.delete('/surveys/:id', SurveyController.delete)

router.get('/users/:id', UserController.getByID)
router.put('/users/:id', UserController.edit)
router.delete('/users/:id', UserController.delete)

module.exports = router
