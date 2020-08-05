const Survey = require('../models/Survey')

class SurveyController {
  async create (req, res) {
    if (!req.body.title) {
      return res.status(400).json({ error: 'field title is required' })
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
