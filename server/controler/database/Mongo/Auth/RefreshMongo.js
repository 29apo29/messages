const CustomError = require("../../../../helper/error/CustomError");
const { User } = require("../../../../model/User");
const { openRefresh } = require("../../../token/openToken");
const Refresh = require("../../../valueControls/Auth/Refresh");

class RefreshMongo extends Refresh {
  constructor(token, info) {
    super(token, info);
  }
  async generateJwt() {
    const username = openRefresh(super.getToken());
    const user = await User.findOne({ username });
    let findToken = null;
    try{
      findToken = user.authorizations.find(
       (e) => e.token === super.getToken()
     );
    }
    catch(e){
      throw new CustomError("Token error", 401);
    }
    if (!user || !findToken || !super.infoControl(findToken.toObject()))
      throw new CustomError("Token error", 401);
    return super.generateJwt({ name: user.name,
      username:user.username,
      bio:user.bio, 
      profilephoto:user.profilephoto,
      email:user.email
    });
  }
}

module.exports = RefreshMongo;
