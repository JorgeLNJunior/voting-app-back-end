const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')

router.get('/surveys/:id', SurveyController.show)
router.post('/surveys', SurveyController.create)

module.exports = router
