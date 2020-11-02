const LocalStorage = require('../../../src/app/services/storage/LocalStorage')
const fs = require('fs')
const banner = fs.readFileSync(`${__dirname}/../../helpers/images/banner.jpg`) // eslint-disable-line

describe('local storage', () => {
  it('should return a local avatar url', async () => {
    const imgData = { buffer: Buffer.from(banner, 'binary'), originalname: 'banner.jpg' }
    const url = await LocalStorage.storeUserAvatar(imgData)

    expect(url).toContain('http://0.0.0.0:3000/uploads/avatars/')
    expect(url.endsWith('.jpg')).toBe(true)
  })

  it('should return a local banner url', async () => {
    const imgData = { buffer: Buffer.from(banner, 'binary'), originalname: 'banner.jpg' }
    const url = await LocalStorage.storeSurveyBanner(imgData)

    expect(url).toContain('http://0.0.0.0:3000/uploads/banners/')
    expect(url.endsWith('.jpg')).toBe(true)
  })
})
