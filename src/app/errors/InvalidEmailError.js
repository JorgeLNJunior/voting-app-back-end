module.exports = class InvalidEmailError extends Error {
  constructor () {
    super('invalid email')
    this.name = 'InvalidEmailError'
    this.statusCode = 400
  }
}
