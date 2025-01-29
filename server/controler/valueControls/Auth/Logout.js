const CustomError = require("../../../helper/error/CustomError");
const { isTokenIncluded, getTokenFromHeader } = require("../../token");
const { openAccess } = require("../../token/openToken");

class Logout {
  constructor(token, req) {
    this.token = token;
    this.req = req;
    this.username = null;
  }
  tokenControl(){
    if (!isTokenIncluded(this.req)) throw new CustomError("UnAuthorized", 401);
    const access = getTokenFromHeader(this.req);
    const username = openAccess(access);
    this.username = username;
    return username;
  };
  getUsername(){
    return this.username;
  }
}

module.exports = Logout;
