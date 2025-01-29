const CustomError = require("../../../../helper/error/CustomError");
const Room = require("../../../../model/Room");
const { User } = require("../../../../model/User");
const Related = require("../../../valueControls/User/Related");


class RelatedMongo extends Related {
  constructor(username) {
    super(username);
    this.user = null;
  }
  async findUser() {
    const username = super.getUsername();
    const user = await User.findOne({ username });
    if (!user) throw new CustomError("UnAuthorized", 401);
    this.user = user;
  }
  async getRelatedUsers() {
    if (this.user === null) await this.findUser();
    const rooms = await Room.find({ users: this.user._id }).populate(
      "users",
      "username"
    );
    if (rooms.length == 0) return new Array();
    const otherUsers = new Set();
    for (const room of rooms) {
      for (const selectedUser of room.users) {
        if (!selectedUser._id.equals(user._id)) {
          otherUsers.add({
            username: selectedUser.username,
            name: selectedUser.username,
            bio: selectedUser.bio,
            profilephoto: selectedUser.profilephoto,
            room:room.link
          });
        }
      }
    }
    return Array.from(...otherUsers);
  }
}

module.exports = RelatedMongo;
