const Survey = require('../models/Survey')
const validator = require('../validators/SurveyValidator')

class SurveyController {
  async create (req, res) {
    try {
      validator.validateCreate(req.body)
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    try {
      const survey = await Survey.create(req.body)
      return res.json({ survey })
    } catch (error) {
      return res.status(500).json({ error: 'internal error' })
    }
  }

  async show (req, res) {
    try {
      const survey = await Survey.getById(req.params.id)
      if (!survey) {
        return res.status(400).json({ error: 'survey not found' })
      }
      return res.json({ survey })
    } catch (error) {
      return res.status(500).json({ error: 'internal error' })
    }
  }

  async addVote (req, res) {
    try {
      const { surveyId, optionId } = req.params
      const survey = await Survey.addVote(surveyId, optionId)
      if (!survey) {
        return res.status(400).json({ error: 'the option does not exist' })
      }
      return res.json(survey)
    } catch (error) {
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new SurveyController()
