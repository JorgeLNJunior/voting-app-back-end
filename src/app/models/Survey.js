const knex = require('../../database/index')

class Survey {
  async create (data, userId) {
    const surveyId = await knex('surveys').insert({
      title: data.title,
      description: data.description,
      user_id: userId
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

  async addVote (surveyID, optionID) {
    var survey = await this.getById(surveyID)
    const option = survey.options.find(option => option.id == optionID) // eslint-disable-line
    if (!option) {
      return undefined
    }
    await knex('options').update({ votes: option.votes + 1 }).where({ id: option.id })

    survey = await this.getById(surveyID)

    return survey
  }

  async update (id, data) {
    await knex('surveys').update(data).where({ id })
    const survey = await knex('surveys').where({ id }).first
    return survey
  }
}

module.exports = new Survey()
