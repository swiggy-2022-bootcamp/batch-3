class ServerError extends Error {
    constructor(err) {
      super(err);
      this.name = "ServerError";
    }
}

module.exports = ServerError;