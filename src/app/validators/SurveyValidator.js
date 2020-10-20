const { EmptyFieldError, ResourceNotFoundError, UnauthorizedError } = require('../helpers/Errors')
const Survey = require('../models/Survey')

class SurveyValidator {
  validateCreate (body) {
    if (!body.title) {
      throw new EmptyFieldError('field title is required')
    }

    if (!body.description) {
      throw new EmptyFieldError('field description is required')
    }

    if (!body.options || body.options.length <= 0) {
      throw new EmptyFieldError('field options is required')
    } else {
      for (var option of body.options) {
        if (!option.name) {
          throw new EmptyFieldError('field option name is required')
        }
      }
    }
  }

  async validateUpdate (body, surveyId, tokenId) {
    const { title, description } = body
    var survey = await Survey.show({ id: surveyId })

    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (survey[0].user_id != tokenId) {
      throw new UnauthorizedError('you are not authorized to edit this resource')
    }
    if (!title && !description) {
      throw new EmptyFieldError('title or description is required')
    }
  }

  async validateDelete (surveyId, tokenId) {
    var survey = await Survey.show({ id: surveyId })

    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (survey[0].user_id != tokenId) {
      throw new UnauthorizedError('unauthorized')
    }
  }

  async validateAddVote (surveyId, optionId) {
    var survey = await Survey.show({ id: surveyId })
    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (!survey[0].options.find(option => option.id == optionId )) {
      throw new ResourceNotFoundError('option not found')
    }
  }
}

module.exports = new SurveyValidator()
