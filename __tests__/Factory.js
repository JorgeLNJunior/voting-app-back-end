const faker = require('faker/locale/pt_BR')
const Survey = require('../src/app/models/Survey')
const User = require('../src/app/models/User')
const Storage = require('../src/app/services/AzureStorage')
const fs = require('fs')

class Factory {
  async createSurvey (userId) {
    const data = this.generateSurveyData()
    data.banner = await Storage.storeSurveyBanner(data.banner)
    const survey = await Survey.create(data, userId)
    return survey
  }

  async createUser (overwrite) {
    const data = this.generateUserData(overwrite)
    const user = await User.create(data)
    return user
  }

  /**
   * @param {Object} overwrite a object with survey data to overwrite (title, description or options)
   */
  generateSurveyData (overwrite) {
    let surveyData = {}
    if (!overwrite) {
      overwrite = {}
    }

    const base64Images = JSON.parse(fs.readFileSync(`${__dirname}/helpers/images/base64Images.json`, 'utf-8')) // eslint-disable-line

    surveyData = {
      title: overwrite.title || faker.lorem.sentence(3),
      description: overwrite.description || faker.lorem.words(10),
      banner: overwrite.banner || base64Images.banner,
      options: overwrite.options || [
        { name: faker.lorem.word() },
        { name: faker.lorem.word() },
        { name: faker.lorem.word() }
      ]
    }

    if (overwrite.title === 'exclude') delete surveyData.title
    if (overwrite.description === 'exclude') delete surveyData.description
    if (overwrite.options === 'exclude') delete surveyData.options
    if (overwrite.banner === 'exclude') delete surveyData.banner

    return surveyData
  }

  /**
   * @param {Object} overwrite a object with user data to overwrite (name, email or password)
   */
  generateUserData (overwrite) {
    if (!overwrite) {
      overwrite = {}
    }

    const name = faker.name.firstName()
    const email = faker.internet.email(name)
    const password = faker.internet.password(8, true)

    const userData = {
      name: overwrite.name || name,
      email: overwrite.email || email,
      password: overwrite.password || password
    }

    if (overwrite.name === 'exclude') delete userData.name
    if (overwrite.email === 'exclude') delete userData.email
    if (overwrite.password === 'exclude') delete userData.password

    return userData
  }
}

module.exports = new Factory()
