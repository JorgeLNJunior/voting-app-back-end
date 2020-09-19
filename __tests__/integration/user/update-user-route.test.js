const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update user route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if the user has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData({ email: 'exclude' })

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(response.status).toBe(200)
  })

  it('should return user data if the user has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData({ email: 'exclude' })

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(response.body).toHaveProperty('user')
  })

  it('should return 400 if name or password is not provided', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(response.status).toBe(400)
  })
})
