const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
const Factory = require('../Factory')
const User = require('../../src/app/models/User')

describe('login route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if user credentials are valid', async () => {
    const data = Factory.generateUserData()
    await User.create(data)

    const response = await request(app)
      .post('/login')
      .send({ email: data.email, password: data.password })

    expect(response.status).toBe(200)
  })
})
