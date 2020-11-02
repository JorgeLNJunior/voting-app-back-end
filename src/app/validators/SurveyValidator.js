const {
  EmptyFieldError,
  ResourceNotFoundError,
  UnauthorizedError,
  FieldLengthError
} = require('../helpers/Errors')
const Survey = require('../models/Survey')

class SurveyValidator {
  validateCreate (body) {
    if (!body.title) {
      throw new EmptyFieldError('field title is required')
    }

    if (!body.description) {
      throw new EmptyFieldError('field description is required')
    }

    if (!body.options) {
      throw new FieldLengthError('field options is required')
    }

    if (body.options.length < 2) {
      throw new FieldLengthError('should have 2 options or more')
    }

    if (body.options.length > 5) {
      throw new FieldLengthError('should have a max of 5 options')
    }

    for (const option of body.options) {
      if (!option.name || option.name === '') {
        throw new EmptyFieldError('field option name is required')
      }
    }
  }

  async validateUpdate (body, surveyId, tokenId) {
    const { title, description } = body
    const survey = await Survey.show({ id: surveyId })

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
    const survey = await Survey.show({ id: surveyId })

    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (survey[0].user_id != tokenId) {
      throw new UnauthorizedError('unauthorized')
    }
  }

  async validateAddVote (surveyId, optionId) {
    const survey = await Survey.show({ id: surveyId })
    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    // eslint-disable-next-line
    if (!survey[0].options.find(option => option.id == optionId )) {
      throw new ResourceNotFoundError('option not found')
    }
  }

  async validateBannerUpdate (banner, surveyId, tokenId) {
    const survey = await Survey.show({ id: surveyId })

    if (!survey[0]) {
      throw new ResourceNotFoundError('survey not found')
    }
    if (survey[0].user_id != tokenId) { // eslint-disable-line
      throw new UnauthorizedError('unauthorized')
    }
    if (!banner) {
      throw new EmptyFieldError('banner is required')
    }
    if (banner.size > 2000000) {
      throw new FieldLengthError('banner size must be less than 2mb')
    }
  }
}

module.exports = new SurveyValidator()
