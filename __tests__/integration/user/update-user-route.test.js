const request = require('supertest')
const fs = require('fs')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

describe('update user route', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if the user has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData()

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(response.status).toBe(200)
  })

  it('should return 200 user avatar has been updated', async () => {
    const imgData = JSON.parse(fs.readFileSync(`${__dirname}/../../helpers/images/base64Images.json`)) //eslint-disable-line
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = { avatar: imgData.avatar }

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(response.status).toBe(200)
  })

  it('should return user data if the user has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData()

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(response.body).toHaveProperty('user')
  })

  it('should return 400 if user does not exists', async () => {
    const user = await Factory.createUser()
    const data = Factory.generateUserData()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .put('/users/200')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: data.name })

    expect(response.status).toBe(400)
  })

  it('should return 403 if id in the token is different from id sent', async () => {
    const user = await Factory.createUser()
    const user2 = await Factory.createUser()
    const token = AuthService.generateToken(user.id)
    const data = Factory.generateUserData()

    const response = await request(app)
      .put(`/users/${user2.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: data.name })

    expect(response.status).toBe(403)
  })

  it('should return 401 if token is not provided', async () => {
    const user = await Factory.createUser()
    const data = Factory.generateUserData()

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .send({ name: data.name })

    expect(response.status).toBe(401)
  })

  it('should return 401 if token is not valid', async () => {
    const user = await Factory.createUser()
    const data = Factory.generateUserData()
    const token = 'invalidtoken'

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: data.name })

    expect(response.status).toBe(401)
  })
})
