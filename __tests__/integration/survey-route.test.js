const request = require('supertest')
const app = require('../../src/app')
const dbUtil = require('../utils/dbUtil')

describe('Survey', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('Should return 200 if vote is added', async () => {
    const body = {
      title: 'Framework front-end',
      description: 'preferência de framework front-end',
      options: [
        { name: 'Vue' },
        { name: 'Angular' },
        { name: 'React' }
      ]
    }

    const response = await request(app)
      .post('/surveys')
      .send(body)

    expect(response.status).toBe(200)
  })
})