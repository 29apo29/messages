const CustomError = require("../../helper/error/CustomError");
const { User } = require("../../model/User");
const { accessToken } = require("../token/generateToken");
const { open } = require("../token/openToken");

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
  async generateJwt() {
    const username = open(this.token);
    const user = await User.findOne({ username });
    const findToken = user.authorizations.find((e) => e.token === this.token);
    if (!user || !findToken || !this.infoControl(findToken.toObject())) throw new CustomError("Token error", 401);
    const accToken = accessToken({
      name: user.name,
      username: user.username,
      email: user.email,
    });
    return accToken;
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
}

module.exports = Refresh;
