const Survey = require('../models/Survey')
const validator = require('../validators/SurveyValidator')
const { ResourceNotFoundError } = require('../helpers/Errors')

class SurveyController {
  async create (req, res, next) {
    try {
      validator.validateCreate(req.body)
      const survey = await Survey.create(req.body, req.UID)
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
      const user = await Survey.getById(id)
      if (!user) {
        throw new ResourceNotFoundError('user not found')
      }

      await Survey.delete(id)
      return res.json({ message: 'survey delete' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new SurveyController()
