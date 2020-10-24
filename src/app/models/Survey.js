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

  async show (data) {
    const surveys = await knex('surveys').where(data).orderByRaw('rand()')
    for (var s of surveys) {
      const options = await knex('options').where({ survey_id: s.id })
      s.options = options
    }
    return surveys
  }

  async addVote (surveyID, optionID) {
    var survey = await this.show({ id: surveyID })
    // eslint-disable-next-line
    const option = survey[0].options.find(option => option.id == optionID)

    await knex('options').update({ votes: option.votes + 1 }).where({ id: option.id })

    survey = await this.show({ id: surveyID })

    return survey
  }

  async update (id, data) {
    await knex('surveys').update(data).where({ id })
    const survey = await knex('surveys').where({ id }).first()
    return survey
  }

  async delete (id) {
    await knex('surveys').delete().where({ id })
  }
}

module.exports = new Survey()
