const azure = require('azure-storage')
const blobService = azure.createBlobService()
const Readable = require('stream').Readable

class AzureStorage {
  async storeUserAvatar (avatarFile) {
    return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists('storage', {
        publicAccessLevel: 'blob'
      }, function (error, result, response) {
        if (error) {
          reject(error)
        }

        const fileExtension = avatarFile.originalname.split('.').pop()
        const readable = new Readable()
        readable.push(avatarFile.buffer)
        readable.push(null)

        const fileName = Date.now() + '.' + fileExtension

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

  async storeSurveyBanner (bannerFile) {
    return new Promise((resolve, reject) => {
      blobService.createContainerIfNotExists('storage', {
        publicAccessLevel: 'blob'
      }, function (error, result, response) {
        if (error) {
          reject(error)
        }

        const fileExtension = bannerFile.originalname.split('.').pop()
        const readable = new Readable()
        readable.push(bannerFile.buffer)
        readable.push(null)

        const fileName = Date.now() + '.' + fileExtension

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
