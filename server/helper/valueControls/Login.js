const { checkHashCompare } = require("../general/generalHelpers");

class Login {
  constructor(username, password, info) {
    this.username = username;
    this.password = password;
    this.useragent = info.useragent;
    this.osname = info.os.name;
    this.osplatform = info.os.platform;
    this.devicetype = info.device.type;
    this.devicebrand = info.device.brand;
    this.devicemodel = info.device.model;
    this.clienttype = info.client.type;
    this.clientname = info.client.name;
    this.clientengine = info.client.engine;
  }
  isReady() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ((this.username.length >= 6 && this.username.length <= 16) || emailRegex.test(this.username)) &&
      (this.password.length >= 6 && this.password.length <= 28);
  }
  getAllValues() {
    return {
      ...this
    }
  }
  getForAuthorization(){
    let result = this.getAllValues();
    delete result.password;
    delete result.username;
    return result;
  }
  checkPasswords = hashed => checkHashCompare(this.password,hashed); 
}

module.exports = Login;