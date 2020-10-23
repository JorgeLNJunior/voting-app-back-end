const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update password route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if password has been updated', async () => {
    const password = 'password'
    const user = await Factory.createUser({ password })
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user.id}/password`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: password,
        newPassword: 'newPassword'
      })

    expect(response.status).toBe(200)
  })
})
