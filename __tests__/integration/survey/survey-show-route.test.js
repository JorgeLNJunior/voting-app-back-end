const request = require('supertest')
const Factory = require('../../Factory')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const AuthService = require('../../../src/app/services/AuthService')

describe('Show survey route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return a object with the survey', async () => {
    const survey = await Factory.createSurvey()

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/surveys/' + survey.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveProperty('survey')
  })

  it('should return 400 if survey does not exist', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/surveys/' + 50)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 401 if token is not provided', async () => {
    const response = await request(app)
      .get('/surveys/' + 50)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const token = 'invalidtoken'

    const response = await request(app)
      .get('/surveys/' + 50)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('should return 500 if an internal error has ocurred', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    await dbUtil.destroyConnection() // force database error

    const response = await request(app)
      .get('/surveys/' + 1)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
