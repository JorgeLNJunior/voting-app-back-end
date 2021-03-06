const request = require('supertest')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const app = require('../../../src/app')
const AuthService = require('../../../src/app/services/AuthService')

describe('Vote add route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if vote is added', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + survey.options[0].id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should return 400 if survey does not exist', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys/' + 500 + '/vote/' + 1)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 400 if option does not exist', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + 10)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 400 if user has already voted', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    await request(app)
      .post('/surveys/' + survey.id + '/vote/' + survey.options[0].id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + survey.options[0].id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 401 if token is not provided', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + 1)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)
    const token = 'invalidtoken'

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + 1)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('Should return 500 if an internal error has ocurred', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)
    const token = AuthService.generateToken(user.id)

    await dbHelper.destroyConnection() // force database error

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + 1)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
