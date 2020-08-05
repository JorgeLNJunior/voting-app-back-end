const Survey = require('../models/Survey')

class SurveyController {
  async create (req, res) {
    const errors = []
    if (!req.body.title) {
      errors.push({ error: 'field title is required' })
    }
    if (!req.body.description) {
      errors.push({ error: 'field description is required' })
    }
    if (!req.body.options || req.body.options.length <= 0) {
      errors.push({ error: 'field options cannot be empty' })
    } else {
      req.body.options.forEach(option => {
        if (!option.name) {
          errors.push({ error: 'field option name cannot be empty' })
        }
      })
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors })
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
