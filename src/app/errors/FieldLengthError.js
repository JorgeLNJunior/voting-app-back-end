module.exports = class FiedlLengthError extends Error {
  constructor (field, maxLength) {
    super(`${field} field length is greater than ${maxLength}`)
    this.name = 'FieldLengthError'
    this.statusCode = 400
  }
}
