const Logout = require("../../../valueControls/Auth/Logout");
const { User } = require("../../../../model/User");
const CustomError = require("../../../../helper/error/CustomError");

class LogoutMongo extends Logout {
  constructor(token, req) {
    super(token, req);
    this.user = null;
  }
  async userControl() {
    super.tokenControl();
    const username = super.getUsername();
    const user = await User.findOne({ username });
    if (!user) throw new CustomError("UnAuthorized", 401);
    this.user = user;
    return true;
  }
  async deleteToken() {
    if (this.user === null) await this.userControl();
    this.user.authorizations = this.user.authorizations.filter(
      (authorization) => authorization.token !== this.token
    );
    await this.user.save();
    return true;
  }
}

module.exports = LogoutMongo;
