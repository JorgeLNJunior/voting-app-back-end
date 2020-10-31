const Readable = require('stream').Readable
const fs = require('fs')

class LocalStorage {
  async storeAvatar (avatarBase64) {
    return new Promise((resolve, reject) => {
      const base64 = avatarBase64.split(';base64,').pop()
      const buffer = Buffer.from(base64, 'base64')
      const readable = new Readable()
      readable.push(buffer)
      readable.push(null)

      const fileName = Date.now() + '.png'

      readable.pipe(fs.createWriteStream(`${__dirname}/../../../public/uploads/avatars/${fileName}`)) // eslint-disable-line
        .on('error', error => reject(error))

      resolve(`http://0.0.0.0:3000/uploads/avatars/${fileName}`)
    })
  }

  async storeSurveyBanner (bannerBase64) {
    return new Promise((resolve, reject) => {
      const base64 = bannerBase64.split(';base64,').pop()
      const buffer = Buffer.from(base64, 'base64')
      const readable = new Readable()
      readable.push(buffer)
      readable.push(null)

      const fileName = Date.now() + '.png'

      readable.pipe(fs.createWriteStream(`${__dirname}/../../../public/uploads/banners/${fileName}`)) // eslint-disable-line
        .on('error', error => reject(error))

      resolve(`http://0.0.0.0:3000/uploads/banners/${fileName}`)
    })
  }
}

module.exports = new LocalStorage()
