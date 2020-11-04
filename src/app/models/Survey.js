const knex = require('../../database/index')
const Storage = require('../services/storage/IndexStorage')

class Survey {
  async create (data, userId) {
    const surveyId = await knex('surveys').insert({
      title: data.title,
      description: data.description,
      user_id: userId,
      banner: data.banner
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
    const surveys = await knex('surveys').where(data).orderByRaw('rand()').limit(20)
    for (const s of surveys) {
      const options = await knex('options').where({ survey_id: s.id })
      s.options = options
    }
    return surveys
  }

  async addVote (surveyID, optionID) {
    let survey = await this.show({ id: surveyID })
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

  async updateBanner (surveyId, bannerFile) {
    const url = await Storage.storeSurveyBanner(bannerFile)

    await knex('surveys').update({ banner: url }).where({ id: surveyId })
    const survey = await knex('surveys').where({ id: surveyId }).first()

    return survey
  }
}

module.exports = new Survey()
