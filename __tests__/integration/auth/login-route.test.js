const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')

describe('login route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if user credentials are valid', async () => {
    const data = Factory.generateUserData()
    await Factory.createUser(data)

    const response = await request(app)
      .post('/login')
      .send({ email: data.email, password: data.password })

    expect(response.status).toBe(200)
  })

  it('should return a jwt token if user credentials are valid', async () => {
    const data = Factory.generateUserData()
    await Factory.createUser(data)

    const response = await request(app)
      .post('/login')
      .send({ email: data.email, password: data.password })

    expect(response.body).toHaveProperty('token')
  })

  it('should return 400 if email is unregistered', async () => {
    const data = Factory.generateUserData()
    await Factory.createUser(data)

    const response = await request(app)
      .post('/login')
      .send({ email: 'unregistered@mail.com', password: data.password })

    expect(response.status).toBe(400)
  })

  it('should return 400 if password is invalid', async () => {
    const data = Factory.generateUserData()
    await Factory.createUser(data)

    const response = await request(app)
      .post('/login')
      .send({ email: data.email, password: 'invalid-password' })

    expect(response.status).toBe(400)
  })
})
