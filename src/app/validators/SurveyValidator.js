class SurveyValidator {
  validateCreate (body) {
    const errors = []

    if (!body.title) {
      errors.push({ error: 'field title cannot be empty' })
    }

    if (!body.description) {
      errors.push({ error: 'field description cannot be empty' })
    }

    if (!body.options || body.options.length <= 0) {
      errors.push({ error: 'field options cannot be empty' })
    } else {
      body.options.forEach(option => {
        if (!option.name) {
          errors.push({ error: 'field option name cannot be empty' })
        }
      })
    }

    if (errors.length > 0) {
      return { pass: false, errors: errors }
    } else { return { pass: true, errors: [] } }
  }
}

module.exports = new SurveyValidator()
