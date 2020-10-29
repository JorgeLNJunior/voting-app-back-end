const azure = require('azure-storage')
const blobService = azure.createBlobService()
const stream = require('streamifier')
const Readable = require('stream').Readable

class AzureStorage {
  async storeAvatar (avatar) {
    const fileExtension = avatar.originalname.split('.').pop()
    const fileName = Date.now() + fileExtension
    return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists('storage', {
        publicAccessLevel: 'blob'
      }, function (error, result, response) {
        if (error) {
          reject(Error('azure storage container error'))
        }
        stream.createReadStream(avatar.buffer)
          .pipe(blobService.createWriteStreamToBlockBlob('storage', `avatars/${fileName}`, {},
            function (error, result, response) {
              if (error) {
                reject(Error('upload error'))
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
          reject(Error('azure storage container error'))
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
              reject(Error('upload error'))
            }
            resolve(`https://vtappstorage.blob.core.windows.net/storage/banners/${fileName}`)
          }))
      })
    })
  }
}

module.exports = new AzureStorage()
