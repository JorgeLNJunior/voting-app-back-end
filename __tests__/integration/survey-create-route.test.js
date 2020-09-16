const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
const Factory = require('../Factory')
const User = require('../../src/app/models/User')
const AuthService = require('../../src/app/services/AuthService')

describe('Survey', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('Should return 200 if survey is created', async () => {
    const body = Factory.generateSurveyData()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(200)
  })

  it('Should return a object with created survey', async () => {
    const body = Factory.generateSurveyData()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.body).toHaveProperty('survey')
  })

  it('Should return 400 if title is not provided', async () => {
    const body = Factory.generateSurveyData({ title: 'exclude' })

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if description is not provided', async () => {
    const body = Factory.generateSurveyData({ description: 'exclude' })

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if options is not provided', async () => {
    const body = Factory.generateSurveyData({ options: 'exclude' })

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if options is empty', async () => {
    const body = Factory.generateSurveyData({ options: [] })

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 400 if option name is empty', async () => {
    const body = Factory.generateSurveyData({ options: [{ name: '' }] })

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('Should return 500 if an internal error has ocurred', async () => {
    const body = Factory.generateSurveyData()

    const userData = Factory.generateUserData()
    const user = await User.create(userData)
    const token = AuthService.generateToken(user.id)

    await dbUtil.destroyConnection() // force database error

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(500)
  })
})
