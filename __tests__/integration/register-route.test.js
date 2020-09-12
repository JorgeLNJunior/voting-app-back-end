const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')
// const Factory = require('../Factory')

describe('register route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if user has been registered', async () => {
    const body = {
      name: 'user',
      email: 'user@mail.com',
      password: '123456'
    }

    const response = await request(app)
      .post('/register')
      .send(body)

    expect(response.status).toBe(200)
  })
})
