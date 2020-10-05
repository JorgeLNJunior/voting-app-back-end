const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update survey', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if survey has been updated', async () => {
    const data = Factory.generateSurveyData()
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put(`/surveys/${survey.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: data.title, desciption: data.desciption })

    expect(response.status).toBe(200)
  })

  it('should return 400 if title or description is not provided', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put(`/surveys/${survey.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ })

    expect(response.status).toBe(400)
  })

  it('should return 400 if survey does not exist', async () => {
    const data = Factory.generateSurveyData()

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put('/surveys/200')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: data.title, desciption: data.desciption })

    expect(response.status).toBe(400)
  })
})
