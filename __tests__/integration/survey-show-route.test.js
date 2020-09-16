const request = require('supertest')
const Factory = require('../Factory')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
const User = require('../../src/app/models/User')
const AuthService = require('../../src/app/services/AuthService')

describe('Show survey route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return a object with survey', async () => {
    const survey = await Factory.createSurvey()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/surveys/' + survey.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveProperty('survey')
  })

  it('should 400 if survey not exists', async () => {
    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/surveys/' + 50)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('Should return 500 if an internal error has ocurred', async () => {
    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    await dbUtil.destroyConnection() // force database error

    const response = await request(app)
      .get('/surveys/' + 1)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
