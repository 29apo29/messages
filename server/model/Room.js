const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  link: {
    type: String,
    trim: true,
    unique: true,
  },
  users: [{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "Message must have who wrote it?"]
  }],
});

RoomSchema.pre("save", async function (next) {
  let isUnique = false;
  while (!isUnique) {
    let array = new Uint8Array(7);
    crypto.getRandomValues(array);
    let hexString = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const existingMessage = await this.constructor.findOne({ link: hexString });
    if (!existingMessage) {
      this.link = hexString;
      isUnique = true;
    }
  }
  next();
});

module.exports = mongoose.model("Room", RoomSchema);
