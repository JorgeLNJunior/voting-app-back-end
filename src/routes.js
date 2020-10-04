const router = require('express').Router()
const SurveyController = require('./app/controllers/SurveyController')
const AuthController = require('./app/controllers/AuthController')
const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

const Survey = require('./app/models/Survey')
const { ResourceNotFoundError, UnauthorizedError, EmptyFieldError } = require('./app/helpers/Errors')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(AuthMiddleware)

router.post('/surveys', SurveyController.create)
router.get('/surveys/:id', SurveyController.show)
router.post('/surveys/:surveyId/vote/:optionId', SurveyController.addVote)
router.put('/surveys/:id', async (req, res, next) => {
  const { id } = req.params
  const { title, description } = req.body

  try {
    var survey = await Survey.getById(id)

    if (!title && !description) {
      throw new EmptyFieldError('title or description is required')
    }
    if (!survey) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (survey.user_id != req.UID) {
      throw new UnauthorizedError('you are not authorized to edit this resource')
    }

    const newData = { }

    if (title) {
      newData.title = title
    }
    if (description) {
      newData.description = description
    }
    survey = await Survey.edit(id, newData)

    return res.json({ survey: survey })
  } catch (error) {
    next(error)
  }
})

router.get('/users/:id', UserController.getByID)
router.put('/users/:id', UserController.edit)
router.delete('/users/:id', UserController.delete)

module.exports = router
