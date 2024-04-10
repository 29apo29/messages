const asyncHandler = require("express-async-handler");
const SignupMongo = require("../database/Mongo/SignupMongo");
const LoginMongo = require("../database/Mongo/LoginMongo");

//signup controler
const signup = asyncHandler(async (req, res, err) => {
  //getting the values from body
  const { name, username, email, password } = req.body;

  const saveObj = new SignupMongo(name, username, email, password);

  let newUser = await saveObj.save();

  res.json(newUser);
});

const login = asyncHandler(async (req, res, err) => {
  const { username, password, info } = req.body;
  const loginMongo = new LoginMongo(username, password, info);
  const result = await loginMongo.save();
  res.json({ user: result });
});

module.exports = { signup, login };
