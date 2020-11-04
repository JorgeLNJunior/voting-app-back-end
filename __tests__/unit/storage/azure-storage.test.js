require('dotenv').config()
const fs = require('fs')
const AzureStorage = require('../../../src/app/services/storage/AzureStorage')
const banner = fs.readFileSync(`${__dirname}/../../helpers/images/banner.jpg`) // eslint-disable-line
const avatar = fs.readFileSync(`${__dirname}/../../helpers/images/avatar.jpg`) // eslint-disable-line

describe('azure storage', () => {
  it('should return a azure avatar url', async () => {
    const imgData = { buffer: Buffer.from(avatar, 'binary'), originalname: 'avatar.jpg' }
    const url = await AzureStorage.storeUserAvatar(imgData)

    expect(url).toContain('storage/avatars/')
    expect(url.endsWith('.jpg')).toBe(true)
  })

  it('should return a azure banner url', async () => {
    const imgData = { buffer: Buffer.from(banner, 'binary'), originalname: 'banner.jpg' }
    const url = await AzureStorage.storeSurveyBanner(imgData)

    expect(url).toContain('storage/banners/')
    expect(url.endsWith('.jpg')).toBe(true)
  })
})
