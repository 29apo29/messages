const CustomError = require("../../../../helper/error/CustomError");
const { User } = require("../../../../model/User");
const EditInfo = require("../../../valueControls/User/EditInfo");

class EditInfoMongo extends EditInfo{
  constructor(name,value,token,req){
    super(name,value,token,req);
  }
  async update(){
    const user = await User.findOne({username:super.getUsername()});
    if(!user) throw new CustomError("User not founded!",401);
    let findToken = null;
    try{
      findToken = user.authorizations.find(
       (e) => e.token === super.getToken()
     );
    }
    catch(e){throw new  CustomError("Bad Request!",400);}
    user[this.name] = this.value;
    await user.save();
    return super.generateJwt({ name: user.name,
      username:user.username,
      bio:user.bio, 
      profilephoto:user.profilephoto,
      email:user.email
    });
  }
}

module.exports = EditInfoMongo;