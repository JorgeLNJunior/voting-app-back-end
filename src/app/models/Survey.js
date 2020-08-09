const knex = require('../../database/index')

class Survey {
  async create (data) {
    const surveyId = await knex('surveys').insert({
      title: data.title,
      description: data.description
    })

    await data.options.forEach(async option => {
      await knex('options').insert({ survey_id: surveyId, name: option.name })
    })

    const survey = await knex('surveys').where({ id: surveyId }).first()
    const options = await knex('options').where({ survey_id: surveyId })
    survey.options = options

    return survey
  }

  async getById (id) {
    const survey = await knex('surveys').where({ id }).first()
    if (!survey) {
      return undefined
    }
    const options = await knex('options').where({ survey_id: id })
    survey.options = options
    return survey
  }
}

module.exports = new Survey()
