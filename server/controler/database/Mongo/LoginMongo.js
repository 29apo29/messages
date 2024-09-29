const CustomError = require("../../../helper/error/CustomError");
const Login = require("../../valueControls/Login");
const { User, Authorization } = require("../../../model/User");

class LoginMongo extends Login {
  constructor(username, password, info) {
    super(username, password, info);
  }
  save = async () => {
    return new Promise(async (resolve, reject) => {
      super.isReady(reject); //isReady for save control

      const user = await User.findOne({
        //find user from db
        $or: [{ username: this.username }, { email: this.username }],
      }).select("+password");

      if (!user) {
        //if there is no user throw an error
        return reject(
          new CustomError(
            "User not founded. Please write a real username or email!",
            400
          )
        );
      }

      if (!super.checkPasswords(user.password)) {
        // if password is wrong
        return reject(new CustomError("Wrong password!", 400));
      }

      super.generateForAuthorization(); // generate smth. for save

      const userAgentInfo = super.getForAuthorization(); // getting client browser info

      const existingAuthorization = user.authorizations.find((auth) => {
        // is the browser saved
        return (
          auth.useragent === userAgentInfo.useragent &&
          auth.osname === userAgentInfo.osname &&
          auth.osplatform === userAgentInfo.osplatform &&
          auth.devicetype === userAgentInfo.devicetype &&
          auth.clientname === userAgentInfo.clientname &&
          auth.clientengine === userAgentInfo.clientengine
        );
      });

      if (existingAuthorization) {
        // if the browser is saved
        let index = user.authorizations.findIndex(
          (auth) =>
            auth.useragent === userAgentInfo.useragent &&
            auth.osname === userAgentInfo.osname &&
            auth.osplatform === userAgentInfo.osplatform &&
            auth.devicetype === userAgentInfo.devicetype &&
            auth.clientname === userAgentInfo.clientname &&
            auth.clientengine === userAgentInfo.clientengine
        ); // find the browser index
        user.authorizations.splice(index, 1)[0]; // extract the object
        await User.updateOne(
          { _id: user._id },
          { $set: { authorizations: user.authorizations } }
        ); // update the user
      }

      const newAuthorization = new Authorization({
        //write new authoriation with new token
        ...userAgentInfo,
      });

      const editedUser = await User.findOneAndUpdate(
        // write the new browser
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
      let response = editedUser.toObject(); // mongoose to object
      delete response.password; // delete password from the object
      return resolve(super.getTokens(response.name,response.email)); // return tokens
    });
  };
}

module.exports = LoginMongo;
