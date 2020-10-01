const request = require('supertest')
const app = require('../../../src/app')
const dbUtil = require('../../utils/dbUtil')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('delete user route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if user has been deleted', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should return 400 if user does not exists', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .delete('/users/200')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 403 if id in the token is different from id sent', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData()
    const user2 = await Factory.createUser(data)

    const response = await request(app)
      .delete(`/users/${user2.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(403)
  })

  it('should return 401 if token is not provided', async () => {
    const user = await Factory.createUser()

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const user = await Factory.createUser()
    const token = 'invalidtoken'

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)
  })
})
