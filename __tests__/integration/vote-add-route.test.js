const request = require('supertest')
const dbUtil = require('../utils/dbUtil')
const Factory = require('../Factory')
const app = require('../../src/app')
const User = require('../../src/app/models/User')
const AuthService = require('../../src/app/services/AuthService')

describe('Vote add route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if vote is added', async () => {
    const survey = await Factory.createSurvey()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + survey.options[0].id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should return 400 if option does not exist', async () => {
    const survey = await Factory.createSurvey()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + 10)
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
      .post('/surveys/' + 1 + '/vote/' + 1)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
