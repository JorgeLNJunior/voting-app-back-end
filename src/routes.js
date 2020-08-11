const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')

router.get('/surveys/:id', SurveyController.show)
router.post('/surveys', SurveyController.create)

router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)

module.exports = router
