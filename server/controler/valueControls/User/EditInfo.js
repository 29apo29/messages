const CustomError = require("../../../helper/error/CustomError");
const { accessToken } = require("../../token/generateToken");
const { openAccess, openReq } = require("../../token/openToken");

class EditInfo {
  constructor(name, value, token, req) {
    this.name = name;
    this.value = value;
    this.token = token;
    this.username = openReq(req);
  }
  controlValue() {
    switch (this.name) {
      case "name":
        if (
          this.value.length < 3 ||
          this.value.length > 28 ||
          !nameRegex.test(this.value)
        )
          return "Name's length must be between 3 and 28 and must not consist a number or special character.";
        break;
      case "username":
        if (this.value.length < 6 || this.value.length > 16)
          return "Username's length must be between 6 and 16.";
        break;
      case "email":
        if (this.value.length < 3 || !emailRegex.test(this.value))
          return "Please write a real email.";
        break;
      case "bio":
        if (this.value.length > 50)
          return "About must have less than 50 character.";
        break;
      default:
        break;
    }
    return true;
  }
  getForSave() {
    const control = this.controlValue();
    if (control === true)
      return { name: this.name, value: this.value, username };
    throw new CustomError(control, 400);
  }
  getUsername(){
    return this.username;
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

module.exports = EditInfo;
