const request = require('supertest')
const path = require('path')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('show user route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if user avatar has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user.id}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', path.join(`${__dirname}/../../helpers/images/avatar.jpeg`)) // eslint-disable-line

    expect(response.status).toBe(200)
  })

  it('should return 403 if user does not have authorization to edit', async () => {
    const user = await Factory.createUser()
    const user2 = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user2.id}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', path.join(`${__dirname}/../../helpers/images/avatar.jpeg`)) // eslint-disable-line

    expect(response.status).toBe(403)
  })
})
