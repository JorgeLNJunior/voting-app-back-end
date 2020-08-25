const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
const Factory = require('../Factory')

describe('Survey', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('Should return 200 if survey is created', async () => {
    const body = Factory.generateSurveyData()

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(200)
  })

  it('Should return a object with created survey', async () => {
    const body = Factory.generateSurveyData()

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.body).toHaveProperty('survey')
  })

  it('Should return 400 if title is not provided', async () => {
    const body = Factory.generateSurveyData({ title: 'exclude' })

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if description is not provided', async () => {
    const body = Factory.generateSurveyData({ description: 'exclude' })

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if options is not provided', async () => {
    const body = Factory.generateSurveyData({ options: 'exclude' })

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if options is empty', async () => {
    const body = Factory.generateSurveyData({ options: [] })

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if option name is empty', async () => {
    const body = Factory.generateSurveyData({ options: [{ name: '' }] })

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 500 if an internal error has ocurred', async () => {
    const body = {
      title: 'Framework front-end',
      description: 'preferência de framework front-end',
      options: [{ name: 'option' }, { name: 'option2' }]
    }

    await dbUtil.destroyConnection() // force database error

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(500)
  })
})
