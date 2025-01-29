const CustomError = require("../../../../helper/error/CustomError");
const { User } = require("../../../../model/User");
const PasswordUpdate = require("../../../valueControls/User/PasswordUpdate");

class PasswordUpdateMongo extends PasswordUpdate{
  constructor(password,token,req){
    super(password,token,req);
  }
  async update(){
    const user = await User.findOne({username:super.getUsername()});
    user.password = super.getNewPassword();
    const newAuth = user.authorizations.filter(e=>e.token == super.getToken());
    user.authorizations = newAuth;
    await user.save();
    return super.generateJwt({ name: user.name,
      username:user.username,
      bio:user.bio, 
      profilephoto:user.profilephoto,
      email:user.email
    });
  }
}

module.exports = PasswordUpdateMongo;