const knex = require('../../database/index')

class SurveyController {
  async create (req, res) {
    const surveyId = await knex('surveys').insert({
      title: req.body.title,
      description: req.body.description
    })

    req.body.options.forEach(async option => {
      await knex('options').insert({ survey_id: surveyId, name: option.name })
    })

    const survey = await knex('surveys').where({ id: surveyId })
    const options = await knex('options').where({ survey_id: surveyId })
    const a = {
      id: survey[0].id,
      title: survey[0].title,
      description: survey[0].description,
      created_at: survey[0].created_at,
      updated_at: survey[0].updated_at,
      options: options
    }

    return res.json({ survey: a })
  }
}

module.exports = new SurveyController()
