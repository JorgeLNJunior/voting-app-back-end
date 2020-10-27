const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update password route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

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

  it('should return 400 if password is invalid', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user.id}/password`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'wrongPassword',
        newPassword: 'password'
      })

    expect(response.status).toBe(400)
  })

  it('should return 400 if user does not exist', async () => {
    const password = 'password'
    const user = await Factory.createUser({ password })
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${500}/password`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: password,
        newPassword: 'newPassword'
      })

    expect(response.status).toBe(400)
  })

  it('should return 403 if user does not have authorization to edit', async () => {
    const password = 'password'
    const user = await Factory.createUser({ password })
    const user2 = await Factory.createUser()
    const token = AuthService.generateToken(user2.id)

    const response = await request(app)
      .post(`/users/${user.id}/password`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: password,
        newPassword: 'newPassword'
      })

    expect(response.status).toBe(403)
  })
})
