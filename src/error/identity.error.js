class IdentityError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "IdentityError";
        this.statusCode = statusCode;
    }
}

module.exports = IdentityError;