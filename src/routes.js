const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.post('/surveys', SurveyController.create)
router.get('/surveys/:id', SurveyController.show)

router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)

module.exports = router
