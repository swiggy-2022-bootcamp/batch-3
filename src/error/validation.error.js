class ValidationError extends Error {
    constructor(errors) {
      super('Bad Request');
      this.name = "ValidationError";
      this.developerMessage = errors;
    }
}

module.exports = ValidationError;