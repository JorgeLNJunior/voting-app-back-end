module.exports = class EmptyFiledError extends Error {
  constructor (fieldName) {
    super(`field ${fieldName} cannot be empty`)
    this.name = 'EmptyFiledError'
    this.statusCode = 400
  }
}
