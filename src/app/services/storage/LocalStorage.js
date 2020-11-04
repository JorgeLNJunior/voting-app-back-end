const Readable = require('stream').Readable
const fs = require('fs')

class LocalStorage {
  async storeUserAvatar (avatarFile) {
    return new Promise((resolve, reject) => {
      const fileExtension = avatarFile.originalname.split('.').pop()
      const readable = new Readable()
      readable.push(avatarFile.buffer)
      readable.push(null)

      const fileName = Date.now() + '.' + fileExtension

      readable.pipe(fs.createWriteStream(`${__dirname}/../../../public/uploads/avatars/${fileName}`)) // eslint-disable-line
        .on('error', error => reject(error))

      resolve(`http://0.0.0.0:3000/uploads/avatars/${fileName}`)
    })
  }

  async storeSurveyBanner (bannerFile) {
    return new Promise((resolve, reject) => {
      const fileExtension = bannerFile.originalname.split('.').pop()
      const readable = new Readable()
      readable.push(bannerFile.buffer)
      readable.push(null)

      const fileName = Date.now() + '.' + fileExtension

      readable.pipe(fs.createWriteStream(`${__dirname}/../../../public/uploads/banners/${fileName}`)) // eslint-disable-line
        .on('error', error => reject(error))

      resolve(`http://0.0.0.0:3000/uploads/banners/${fileName}`)
    })
  }
}

module.exports = new LocalStorage()
