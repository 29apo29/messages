const CustomError = require("../../../helper/error/CustomError");
const { accessToken } = require("../../token/generateToken");
const { openReq } = require("../../token/openToken");

class PasswordUpdate{
  constructor(password,token,req){
    this.password = password;
    this.token = token;
    this.username = openReq(req);
  }
  isReady(){
    if (this.password.length < 6 || this.password.length > 28) {
      throw new CustomError("Please write a real password!", 400);
    }
    if(!this.token) throw new CustomError("Bad Request!", 400);
    return true;
  }
  getUsername(){
    return this.username;
  }
  getNewPassword(){
    return this.password;
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
module.exports = PasswordUpdate;