module.exports = class EmailRegisteredError extends Error {
  constructor () {
    super('email is alredy registered')
    this.name = 'EmailRegisteredError'
    this.statusCode = 400
  }
}
