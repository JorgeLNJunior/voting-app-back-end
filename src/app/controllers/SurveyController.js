const Survey = require('../models/Survey')
const validator = require('../validators/SurveyValidator')

class SurveyController {
  async create (req, res, next) {
    try {
      validator.validateCreate(req.body)

      const data = req.body

      const survey = await Survey.create(data, req.UID)
      return res.json({ survey })
    } catch (error) {
      next(error)
    }
  }

  async show (req, res, next) {
    const query = req.query
    try {
      const surveys = await Survey.show(query)
      return res.json({ surveys })
    } catch (error) {
      next(error)
    }
  }

  async addVote (req, res, next) {
    try {
      const userId = req.UID
      const { surveyId, optionId } = req.params
      await validator.validateAddVote(surveyId, optionId, userId)

      const survey = await Survey.addVote(surveyId, optionId, userId)
      return res.json(survey)
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    const { id } = req.params
    const { title, description } = req.body

    try {
      await validator.validateUpdate(req.body, id, req.UID)

      const newData = {}
      /* istanbul ignore next */
      if (title) {
        newData.title = title
      }
      /* istanbul ignore next */
      if (description) {
        newData.description = description
      }

      const survey = await Survey.update(id, newData)

      return res.json({ survey: survey })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params

    try {
      await validator.validateDelete(id, req.UID)
      await Survey.delete(id)
      return res.json({ message: 'survey deleted' })
    } catch (error) {
      next(error)
    }
  }

  async updateBanner (req, res, next) {
    const banner = req.file
    const { id } = req.params

    try {
      await validator.validateBannerUpdate(banner, id, req.UID)

      const survey = await Survey.updateBanner(id, banner)

      return res.json({ survey })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new SurveyController()
