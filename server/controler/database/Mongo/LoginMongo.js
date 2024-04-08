const CustomError = require("../../../helper/error/CustomError");
const Login = require("../../../helper/valueControls/Login");
const User = require("../../../model/User");

class LoginMongo extends Login {
  constructor(username, password, info) {
    super(username, password, info);
  }
  save = async () => {
    return new Promise(async (resolve, reject) => {
      if (!super.isReady()) {
        return reject(new CustomError("Bad request", 400));
      }
      const user = await User.findOne({
        $or: [{ username: values.username }, { email: values.username }],
      })
        .select("+password")
        .populate({
          path: "saved",
          populate: {
            path: "userid",
            model: "User",
          },
        });

      if (!user) {
        return reject(
          new CustomError(
            "User not founded. Please write a real usernaem or email!",
            400
          )
        );
      }
      if (!super.checkPasswords(user.password)) {
        return reject(new CustomError("Wrong password!", 400));
      }
      const newAuthorization = {
        ...super.getForAuthorization()
      }
      const editedUser = await Note.findOneAndUpdate({ _id: user._id }, { $push: { authorizations: { $each: [newAuthorization], $sort: { createdAt: -1 } } } }, { new: 1 });
    });
  };
}
