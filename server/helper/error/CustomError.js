class CustomError extends Error {
  constructor(message, status) {
    super(message), (this.status = status);
  }
  static unAuthorized = () => {
    return new CustomError("UnAuthorized", 401);
  };
}

module.exports = CustomError;
