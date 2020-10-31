const AzureStorage = require('./AzureStorage')
const LocalStorage = require('./LocalStorage')

class Storage {
  async storeAvatar (avatarBase64) {
    if (process.env.AZURE_STORAGE === 'true') {
      return AzureStorage.storeAvatar(avatarBase64)
    }
    return LocalStorage.storeAvatar(avatarBase64)
  }

  async storeSurveyBanner (bannerBase64) {
    if (process.env.AZURE_STORAGE === 'true') {
      return AzureStorage.storeSurveyBanner(bannerBase64)
    }
    return LocalStorage.storeSurveyBanner(bannerBase64)
  }
}

module.exports = new Storage()
