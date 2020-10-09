const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('survey delete', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if survey has been deleted', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .delete(`/surveys/${survey.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should return 400 if survey does not exist', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const ramdomNumber = Math.floor(Math.random() * 100)

    const response = await request(app)
      .delete(`/surveys/${ramdomNumber}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 401 if token is not provided', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const response = await request(app)
      .delete(`/surveys/${survey.id}`)

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const user = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)
    const token = 'invalidtoken'

    const response = await request(app)
      .delete(`/surveys/${survey.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)
  })

  it('should return 403 if user does not have privileges to delete', async () => {
    const user = await Factory.createUser()
    const userWithoutPrivileges = await Factory.createUser()
    const survey = await Factory.createSurvey(user.id)

    const token = AuthService.generateToken(userWithoutPrivileges.id)

    const response = await request(app)
      .delete(`/surveys/${survey.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(403)
  })
})
