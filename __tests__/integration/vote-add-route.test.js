const request = require('supertest')
const dbUtil = require('../utils/dbUtil')
const Survey = require('../../src/app/models/Survey')
const app = require('../../src/app')

describe('Vote add route', () => {
  beforeEach(async () => await dbUtil.cleanTables())
  afterAll(async () => await dbUtil.destroyConnection())

  it('should return 200 if vote is added', async () => {
    const survey = await Survey.create({
      title: 'Framework front-end',
      description: 'preferência de framework front-end',
      options: [
        { name: 'Vue' },
        { name: 'Angular' },
        { name: 'React' }
      ]
    })

    const response = await request(app)
      .post('/surveys/' + survey.id + '/vote/' + survey.options[0].id)

    expect(response.status).toBe(200)
  })
})
