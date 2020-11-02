const AzureStorage = require('./AzureStorage')
const LocalStorage = require('./LocalStorage')

class Storage {
  async storeUserAvatar (avatarFile) {
    if (process.env.AZURE_STORAGE === 'true') {
      return AzureStorage.storeUserAvatar(avatarFile)
    }
    return LocalStorage.storeUserAvatar(avatarFile)
  }

  async storeSurveyBanner (bannerFile) {
    if (process.env.AZURE_STORAGE === 'true') {
      return AzureStorage.storeSurveyBanner(bannerFile)
    }
    return LocalStorage.storeSurveyBanner(bannerFile)
  }
}

module.exports = new Storage()
