const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('show user route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if user exists', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get(`/users/?id=${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should return user data', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get(`/users/?id=${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveProperty('users')
  })

  it('should return 400 if user does not exist', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get('/users/?id=300')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })

  it('should return 401 if token is not provided', async () => {
    const user = await Factory.createUser()

    const response = await request(app)
      .get(`/users/?id=${user.id}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const user = await Factory.createUser()
    const token = 'invalidToken'

    const response = await request(app)
      .get(`/users/?id=${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)
  })

  it('should return user votes', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .get(`/users/${user.id}/votes`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('votes')
  })

  it('should return 500 if an internal error has ocurred', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    await dbHelper.destroyConnection() // force database error

    const response = await request(app)
      .get('/users/?id=300')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
  })
})
