const EmptyFieldError = require('../errors/EmptyFieldError')

class SurveyValidator {
  validateCreate (body) {
    if (!body.title) {
      throw new EmptyFieldError('title')
    }

    if (!body.description) {
      throw new EmptyFieldError('description')
    }

    if (!body.options || body.options.length <= 0) {
      throw new EmptyFieldError('options')
    } else {
      for (var option of body.options) {
        if (!option.name) {
          throw new EmptyFieldError('option name')
        }
      }
    }
  }
}

module.exports = new SurveyValidator()
