const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

const bannerPath = `${__dirname}/../../helpers/images/banner.jpg` // eslint-disable-line

describe('survey', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if survey banner has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const survey = await Factory.createSurvey(user.id)

    const response = await request(app)
      .post(`/surveys/${survey.id}/banner`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .attach('banner', bannerPath)

    expect(response.status).toBe(200)
  })

  it('should return 403 if user does not have permission to update', async () => {
    const user = await Factory.createUser()
    const unauthorizedUser = Factory.createUser()
    const token = AuthService.generateToken(unauthorizedUser.id)

    const survey = await Factory.createSurvey(user.id)

    const response = await request(app)
      .post(`/surveys/${survey.id}/banner`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .attach('banner', bannerPath)

    expect(response.status).toBe(403)
  })
})
