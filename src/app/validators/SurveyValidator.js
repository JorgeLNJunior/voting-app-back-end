const { EmptyFieldError } = require('../helpers/Errors')

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
}

module.exports = new SurveyValidator()
