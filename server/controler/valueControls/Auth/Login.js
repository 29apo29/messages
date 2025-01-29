const CustomError = require("../../../helper/error/CustomError");
const { checkHashCompare } = require("../../../helper/general/generalHelpers");
const { accessToken, refreshToken } = require("../../token/generateToken");

class Login {
  constructor(username, password, info) {
    this.username = username.toLowerCase().trim();
    this.password = password;
    this.useragent = info.userAgent;
    this.osname = info.os.name;
    this.osplatform = info.os.platform;
    this.devicetype = info.device.type;
    this.devicebrand = info.device.brand;
    this.devicemodel = info.device.model;
    this.clienttype = info.client.type;
    this.clientname = info.client.name;
    this.clientengine = info.client.engine;
  }
  isReady(reject) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !(
        (this.username.length >= 6 && this.username.length <= 16) ||
        emailRegex.test(this.username)
      )
    ) {
      reject(new CustomError("Please write a real username or email!", 400));
    }
    if (this.password.length < 6 || this.password.length > 28) {
      reject(new CustomError("Please write a real password!", 400));
    }
    if (!this.useragent) {
      reject(new CustomError("Bad request", 400));
    }
    return true;
  }
  getAllValues() {
    return {
      ...this,
    };
  }
  getForAuthorization() {
    let result = this.getAllValues();
    delete result.password;
    delete result.username;
    return result;
  }
  checkPasswords(hashed) {
    return checkHashCompare(this.password, hashed);
  }
  generateToken() {
    this.token = refreshToken({ username: this.username });
  }
  generateJwt(values) {
    this.jwt = accessToken({...values});
  }
  generateDates() {
    this.endat = new Date(new Date().setMonth(new Date().getMonth() + 1));
    this.createdat = new Date();
  }
  generateForAuthorization() {
    this.generateDates();
    this.generateToken();
  }
  getTokens(values) {
    this.generateJwt(values);
    return { jwt: this.jwt, token: this.token };
  }
}

module.exports = Login;
