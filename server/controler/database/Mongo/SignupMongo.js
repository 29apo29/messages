const CustomError = require("../../../helper/error/CustomError");
const User = require("../../../model/User");
const Signup = require("../../../helper/valueControls/Signup");

class SignupMongo extends Signup {
  constructor(name, username, email, password, navigator) {
    super(name, username, email, password, navigator);
  }
  save = async () => {
    return new Promise(async (resolve, reject) => {
      super.isReady(reject);
      const values = super.getAllValues();
      const newUser = await User.create({ ...values });
      resolve(newUser);
    })
  }
}
module.exports = SignupMongo;