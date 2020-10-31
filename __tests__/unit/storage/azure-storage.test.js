require('dotenv').config()
const fs = require('fs')
const AzureStorage = require('../../../src/app/services/storage/AzureStorage')
const imgData = JSON.parse(fs.readFileSync(`${__dirname}/../../helpers/images/base64Images.json`)) // eslint-disable-line

describe('azure storage', () => {
  it('should return a azure avatar url', async () => {
    const url = await AzureStorage.storeAvatar(imgData.avatar)

    expect(url).toContain('storage/avatars/')
    expect(url.endsWith('.png')).toBe(true)
  })

  it('should return a azure banner url', async () => {
    const url = await AzureStorage.storeSurveyBanner(imgData.banner)

    expect(url).toContain('storage/banners/')
    expect(url.endsWith('.png')).toBe(true)
  })
})
