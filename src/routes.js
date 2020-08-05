const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')

router.post('/surveys', SurveyController.create)

module.exports = router
