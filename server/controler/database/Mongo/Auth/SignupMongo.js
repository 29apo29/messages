const { User } = require("../../../../model/User");
const Signup = require("../../../valueControls/Auth/Signup");

class SignupMongo extends Signup {
  constructor(name, username, email, password, passwordAgain) {
    super(name, username, email, password, passwordAgain);
  }
  save = async () => {
    return new Promise(async (resolve, reject) => {
      super.isReady(reject);
      const values = super.getAllValues();
      await User.create({ ...values })
        .then((newUser) => resolve(newUser))
        .catch((err) => reject(err));
    });
  };
}
module.exports = SignupMongo;
