const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('survey', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if survey is created', async () => {
    const body = Factory.generateSurveyData()

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(200)
  })

  it('should return a object with created survey', async () => {
    const body = Factory.generateSurveyData()

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.body).toHaveProperty('survey')
  })

  it('should return 400 if title is not provided', async () => {
    const body = Factory.generateSurveyData({ title: 'exclude' })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if description is not provided', async () => {
    const body = Factory.generateSurveyData({ description: 'exclude' })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if options is not provided', async () => {
    const body = Factory.generateSurveyData({ options: 'exclude' })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if options is empty', async () => {
    const body = Factory.generateSurveyData({ options: [] })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if option name is empty', async () => {
    const body = Factory.generateSurveyData({ options: [{ name: '' }, { name: '' }] })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if is greater than 5', async () => {
    const body = Factory.generateSurveyData()
    body.options.push({ name: 'name' })
    body.options.push({ name: 'name' })
    body.options.push({ name: 'name' })

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 401 if token is not provided', async () => {
    const body = Factory.generateSurveyData()

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .send(body)

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const body = Factory.generateSurveyData()
    const token = 'invalidtoken'

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(401)
  })

  it('should return 500 if an internal error has ocurred', async () => {
    const body = Factory.generateSurveyData()

    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    await dbHelper.destroyConnection() // force database error

    const response = await request(app)
      .post('/surveys')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)

    expect(response.status).toBe(500)
  })
})
