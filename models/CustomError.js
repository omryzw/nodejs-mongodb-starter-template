module.exports = class CustomError {
  constructor(status = 500, message, additionalInfo = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
};
