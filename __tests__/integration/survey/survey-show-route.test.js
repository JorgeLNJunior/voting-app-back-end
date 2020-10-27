const request = require('supertest')
const Factory = require('../../Factory')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const AuthService = require('../../../src/app/services/AuthService')

describe('Show survey route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return a object with the survey', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/surveys/?id=' + survey.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveProperty('surveys')
  })

  it('should return 500 if an internal error has ocurred', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)
    const token = AuthService.generateToken(user.id)

    await dbHelper.destroyConnection() // force database error

    const response = await request(app)
      .get('/surveys/?id=' + survey.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
