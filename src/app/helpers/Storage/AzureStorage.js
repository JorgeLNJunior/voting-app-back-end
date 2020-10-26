const azure = require('azure-storage')
const blobService = azure.createBlobService()
const stream = require('streamifier')

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
            (error, result, response) => {
              if (error) {
                reject(Error('upload error'))
              }
              resolve(`https://vtappstorage.blob.core.windows.net/storage/avatars/${fileName}`)
            }))
      })
    })
  }
}

module.exports = new AzureStorage()
