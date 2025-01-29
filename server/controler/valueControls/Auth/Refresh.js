const { accessToken } = require("../../token/generateToken");

class Refresh {
  constructor(token,info) {
    this.token = token;
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
  infoControl(tokenObj){
    let keys = Object.keys(this);
    keys = keys.slice(1,keys.length);
    for (let key of keys) {
      if (tokenObj[key] !== this[key]) {
        return false;
      }
    }
    return true;
  }
  getToken(){
    return this.token;
  }
  generateJwt(values){
    return accessToken({
      ...values
    });
  }
}

module.exports = Refresh;
