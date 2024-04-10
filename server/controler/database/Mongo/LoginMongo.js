const CustomError = require("../../../helper/error/CustomError");
const Login = require("../../../helper/valueControls/Login");
const { User, Authorization } = require("../../../model/User");

class LoginMongo extends Login {
  constructor(username, password, info) {
    super(username, password, info);
  }
  save = async () => {
    return new Promise(async (resolve, reject) => {
      super.isReady(reject);
      const user = await User.findOne({
        $or: [{ username: this.username }, { email: this.username }],
      }).select("+password");

      if (!user) {
        return reject(
          new CustomError(
            "User not founded. Please write a real username or email!",
            400
          )
        );
      }
      if (!super.checkPasswords(user.password)) {
        return reject(new CustomError("Wrong password!", 400));
      }
      super.generateForAuthorization();
      const newAuthorization = new Authorization({
        ...super.getForAuthorization(),
      });
      const editedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $push: {
            authorizations: {
              $each: [newAuthorization],
              $sort: { createdAt: -1 },
            },
          },
        },
        { new: 1 }
      );
      return resolve(editedUser);
    });
  };
}

module.exports = LoginMongo;
