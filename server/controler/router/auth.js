const asyncHandler = require("express-async-handler");
const SignupMongo = require("../database/Mongo/SignupMongo");
const LoginMongo = require("../database/Mongo/LoginMongo");
const Refresh = require("../valueControls/Refresh");

//signup controler
const signup = asyncHandler(async (req, res, err) => {
  //getting the values from body
  const { name, username, email, password, passwordAgain } = req.body;
  const saveObj = new SignupMongo(
    name,
    username,
    email,
    password,
    passwordAgain
  );

  let newUser = await saveObj.save();

  res.json(newUser);
});

const login = asyncHandler(async (req, res, err) => {
  const { username, password, info } = req.body;
  const loginMongo = new LoginMongo(username, password, info);
  const result = await loginMongo.save();
  res.json({ ...result });
});

const refresh = asyncHandler(async (req, res, err) => {
  const refreshC = new Refresh(req.body.token,req.body.info);
  const accToken = await refreshC.generateJwt();
  res.json({ jwt: accToken });
});

module.exports = { signup, login, refresh };
