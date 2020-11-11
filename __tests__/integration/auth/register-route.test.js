const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')

describe('register route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

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

    await Factory.createUser(body)

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if password length is greater than 20', async () => {
    const body = Factory.generateUserData({ password: '0'.repeat(21) })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if name length is greater than 50', async () => {
    const body = Factory.generateUserData({
      name: 'name'.repeat(15)
    })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if email length is greater than 50', async () => {
    const body = Factory.generateUserData({
      email: 'email'.repeat(15) + '@mail.com'
    })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 400 if email is invalid', async () => {
    const body = Factory.generateUserData({ email: 'invalidMail' })

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(400)
  })

  it('should return 500 if an internal error has ocurred', async () => {
    const body = Factory.generateUserData()

    await dbHelper.destroyConnection() // force database error

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(500)
  })
})
