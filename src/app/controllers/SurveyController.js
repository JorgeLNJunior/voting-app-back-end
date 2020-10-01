const Survey = require('../models/Survey')
const validator = require('../validators/SurveyValidator')
const { ResourceNotFoundError } = require('../helpers/Errors')

class SurveyController {
  async create (req, res, next) {
    try {
      validator.validateCreate(req.body)
      const survey = await Survey.create(req.body)
      return res.json({ survey })
    } catch (error) {
      next(error)
    }
  }

  async show (req, res, next) {
    try {
      const survey = await Survey.getById(req.params.id)
      if (!survey) {
        throw new ResourceNotFoundError('survey not found')
      }
      return res.json({ survey })
    } catch (error) {
      next(error)
    }
  }

  async addVote (req, res, next) {
    try {
      const { surveyId, optionId } = req.params
      const survey = await Survey.addVote(surveyId, optionId)
      if (!survey) {
        throw new ResourceNotFoundError('survey not found')
      }
      return res.json(survey)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new SurveyController()
