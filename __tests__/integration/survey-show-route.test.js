const request = require('supertest')
const Factory = require('../Factory')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')

describe('Show survey route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return a object with survey', async () => {
    const survey = await Factory.createSurvey()

    const response = await request(app)
      .get('/surveys/' + survey.id)

    expect(response.body).toHaveProperty('survey')
  })

  it('should 400 if survey not exists', async () => {
    const response = await request(app)
      .get('/surveys/' + 50)

    expect(response.status).toBe(400)
  })

  it('Should return 500 if an internal error has ocurred', async () => {
    await dbUtil.destroyConnection() // force database error

    const response = await request(app)
      .get('/surveys/' + 1)

    expect(response.status).toBe(500)
  })
})
