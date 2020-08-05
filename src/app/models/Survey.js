const knex = require('../../database/index')

class Survey {
  async create (data) {
    const surveyId = await knex('surveys').insert({
      title: data.title,
      description: data.description
    })

    data.options.forEach(async option => {
      await knex('options').insert({ survey_id: surveyId, name: option.name })
    })

    const survey = await knex('surveys').where({ id: surveyId })
    const options = await knex('options').where({ survey_id: surveyId })
    survey[0].options = options

    return survey[0]
  }
}

module.exports = new Survey()
