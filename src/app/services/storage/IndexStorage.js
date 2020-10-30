const Azure = require('./AzureStorage')
const Local = require('./LocalStorage')

class Storage {
  /**
   * @param {String} storeOn (local or azure)
   */
  constructor (storeOn) {
    this.storeOn = storeOn
  }

  async storeAvatar (avatarBase64) {
    if (this.storeOn !== 'azure' && this.storeOn !== 'local') {
      return new Error('invalid param on Storage class constructor')
    }
    if (this.storeOn === 'azure') {
      return Azure.storeAvatar(avatarBase64)
    }
    return Local.storeAvatar(avatarBase64)
  }

  async storeSurveyBanner (bannerBase64) {
    if (this.storeOn === 'azure') {
      return Azure.storeSurveyBanner(bannerBase64)
    }
    return Local.storeSurveyBanner(bannerBase64)
  }
}

module.exports = Storage
