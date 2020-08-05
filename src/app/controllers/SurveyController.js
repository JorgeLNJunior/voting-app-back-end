const Survey = require('../models/Survey')
const validator = require('../validators/SurveyValidator')

class SurveyController {
  async create (req, res) {
    const validation = validator.validateCreate(req.body)
    if (!validation.pass) {
      return res.status(400).json({ errors: validation.errors })
    }
    try {
      const survey = await Survey.create(req.body)
      return res.json({ survey })
    } catch (error) {
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new SurveyController()
