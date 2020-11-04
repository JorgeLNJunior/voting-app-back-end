const request = require('supertest')
const app = require('../../../src/app')
const dbHelper = require('../../helpers/DBHelper')
const Factory = require('../../Factory')
const AuthService = require('../../../src/app/services/AuthService')

const avatarPath = `${__dirname}/../../helpers/images/avatar.jpg` // eslint-disable-line
const noCompressedAvatarPath = `${__dirname}/../../helpers/images/avatar-no-compressed.jpg` // eslint-disable-line

describe('survey', () => {
  beforeEach(async () => await dbHelper.cleanTables())
  afterAll(async () => await dbHelper.destroyConnection())

  it('should return 200 if survey avatar has been updated', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user.id}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', avatarPath)

    expect(response.status).toBe(200)
  })

  it('should return 403 if user does not have permission to update', async () => {
    const user = await Factory.createUser()
    const unauthorizedUser = Factory.createUser()
    const token = AuthService.generateToken(unauthorizedUser.id)

    const response = await request(app)
      .post(`/users/${user.id}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', avatarPath)

    expect(response.status).toBe(403)
  })

  it('should return 400 if user does not exist', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${500}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', avatarPath)

    expect(response.status).toBe(400)
  })

  it('should return 400 if avatar size is greater than 1mb', async () => {
    const user = await Factory.createUser()
    const token = AuthService.generateToken(user.id)

    const response = await request(app)
      .post(`/users/${user.id}/avatar`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', noCompressedAvatarPath)

    expect(response.status).toBe(400)
  })
})
