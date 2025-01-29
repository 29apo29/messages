const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const AuthorizationSchema = new Schema({
  token: {
    type: String,
    required: [true, "Authorization token couldn't find."],
  },
  useragent: {
    type: String,
    required: [true, "UserAgent couldn't find"],
  },
  osname: {
    type: String,
  },
  osplatform: {
    type: String,
  },
  devicetype: {
    type: String,
  },
  devicebrand: {
    type: String,
  },
  devicemodel: {
    type: String,
  },
  clienttype: {
    type: String,
  },
  clientname: {
    type: String,
  },
  clientengine: {
    type: String,
  },
  createdat:{
    type:Date,
    required:true
  },
  endat:{
    type:Date,
    required:true
  }
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "You must have a name."],
    trim: true,
    minlength: 3,
    maxlength: 28,
    match: /^[a-zA-Z\s]{3,28}$/,
  },
  username: {
    type: String,
    required: [true, "You must have a username."],
    unique:true,
    trim: true,
    minlength: 6,
    maxlength: 16,
    match: /^[a-z0-9\s]{6,16}$/,
  },
  profilephoto: {
    type: String
  },
  email: {
    type: String,
    required: [true, "You must type email"],
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
  },
  password: {
    type: String,
    required: [true, "You must type password"],
    select: false,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  authorizations: [AuthorizationSchema],
});

UserSchema.methods.getResetPasswordTokenFromUser = function () {
  const { RESET_PASSWORD_EXPIRE } = process.env;
  const randomHexString = crypto.randomBytes(15).toString("hex");

  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  console.log('passwrod is modified')
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Authorization: mongoose.model("Authorization", AuthorizationSchema),
};
