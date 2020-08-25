const faker = require('faker/locale/pt_BR')

class Factory {
  /**
   *
   * @param {Object} overwrite a object with user data to overwrite (title, description or options)
   */
  generateSurveyData (overwrite) {
    var surveyData = {}
    if (!overwrite) {
      overwrite = {}
    }
    surveyData = {
      title: overwrite.title || faker.lorem.sentence(4),
      description: overwrite.description || faker.lorem.paragraph(2),
      options: overwrite.options || [
        { name: faker.lorem.word() },
        { name: faker.lorem.word() },
        { name: faker.lorem.word() }
      ]
    }

    if (overwrite.title === 'exclude') delete surveyData.title
    if (overwrite.description === 'exclude') delete surveyData.description
    if (overwrite.options === 'exclude') delete surveyData.options

    return surveyData
  }
}

module.exports = new Factory()
