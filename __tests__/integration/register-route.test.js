const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
const Factory = require('../Factory')
const User = require('../../src/app/models/User')

describe('register route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if user has been registered', async () => {
    const body = Factory.generateUserData()

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(200)
  })

  it('should return a object with user data', async () => {
    const body = Factory.generateUserData()

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.body).toHaveProperty('user')
  })

  it('should return 400 if name is not provided', async () => {
    const body = Factory.generateUserData({ name: 'exclude' })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if email is not provided', async () => {
    const body = Factory.generateUserData({ email: 'exclude' })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if password is not provided', async () => {
    const body = Factory.generateUserData({ password: 'exclude' })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if the email is already registered', async () => {
    const body = Factory.generateUserData({ email: 'user@mail.com' })

    await User.create(body)

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })
})
