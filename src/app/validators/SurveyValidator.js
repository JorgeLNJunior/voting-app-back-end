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
    var survey = await Survey.getById(surveyId)

    if (!survey) {
      throw new ResourceNotFoundError('survey not found')
    }
    /* istanbul ignore next */
    // eslint-disable-next-line
    if (survey.user_id != tokenId) {
      throw new UnauthorizedError('you are not authorized to edit this resource')
    }
    if (!title && !description) {
      throw new EmptyFieldError('title or description is required')
    }
  }
}

module.exports = new SurveyValidator()
