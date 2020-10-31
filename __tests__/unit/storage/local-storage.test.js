const LocalStorage = require('../../../src/app/services/storage/LocalStorage')
const fs = require('fs')
const imgData = JSON.parse(fs.readFileSync(`${__dirname}/../../helpers/images/base64Images.json`)) // eslint-disable-line

describe('local storage', () => {
  it('should return a local avatar url', async () => {
    const url = await LocalStorage.storeAvatar(imgData.avatar)

    expect(url).toContain('http://0.0.0.0:3000/uploads/avatars/')
    expect(url.endsWith('.png')).toBe(true)
  })

  it('should return a local banner url', async () => {
    const url = await LocalStorage.storeSurveyBanner(imgData.banner)

    expect(url).toContain('http://0.0.0.0:3000/uploads/banners/')
    expect(url.endsWith('.png')).toBe(true)
  })
})
