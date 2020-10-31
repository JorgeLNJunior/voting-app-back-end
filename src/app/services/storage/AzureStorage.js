const azure = require('azure-storage')
const blobService = azure.createBlobService()
const Readable = require('stream').Readable

class AzureStorage {
  async storeAvatar (avatarBase64) {
    return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists('storage', {
        publicAccessLevel: 'blob'
      }, function (error, result, response) {
        if (error) {
          reject(error)
        }

        const base64 = avatarBase64.split(';base64,').pop()
        const buffer = Buffer.from(base64, 'base64')
        const readable = new Readable()
        readable.push(buffer)
        readable.push(null)

        const fileName = Date.now() + '.png'

        readable.pipe(blobService.createWriteStreamToBlockBlob('storage', `avatars/${fileName}`, {},
          function (error, result, response) {
            if (error) {
              reject(error)
            }
            resolve(`https://vtappstorage.blob.core.windows.net/storage/avatars/${fileName}`)
          }))
      })
    })
  }

  async storeSurveyBanner (bannerBase64) {
    return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists('storage', {
        publicAccessLevel: 'blob'
      }, function (error, result, response) {
        if (error) {
          reject(error)
        }

        const base64 = bannerBase64.split(';base64,').pop()
        const buffer = Buffer.from(base64, 'base64')
        const readable = new Readable()
        readable.push(buffer)
        readable.push(null)

        const fileName = Date.now() + '.png'

        readable.pipe(blobService.createWriteStreamToBlockBlob('storage', `banners/${fileName}`, {},
          function (error, result, response) {
            if (error) {
              reject(error)
            }
            resolve(`https://vtappstorage.blob.core.windows.net/storage/banners/${fileName}`)
          }))
      })
    })
  }
}

module.exports = new AzureStorage()
