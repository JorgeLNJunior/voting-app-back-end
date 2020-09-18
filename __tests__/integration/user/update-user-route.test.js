const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update user route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should 200 if user has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })
})
