const request = require('supertest')
const Survey = require('../../src/app/models/Survey')
const app = require('../../src/app')

describe('Show survey route', () => {
  it('should return a object with survey', async () => {
    const survey = await Survey.create({
      title: 'title',
      description: 'description',
      options: [{ name: 'op1' }, { name: 'op2' }]
    })

    const response = await request(app)
      .get('/surveys/' + survey.id)

    expect(response.body).toHaveProperty('survey')
  })
})
