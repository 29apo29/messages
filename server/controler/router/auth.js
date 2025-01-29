const asyncHandler = require("express-async-handler");
const SignupMongo = require("../database/Mongo/Auth/SignupMongo");
const LoginMongo = require("../database/Mongo/Auth/LoginMongo");
const LogoutMongo = require("../database/Mongo/Auth/LogoutMongo");
const RefreshMongo = require("../database/Mongo/Auth/RefreshMongo");

//signup controler
const signup = asyncHandler(async (req, res, next) => {
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

const login = asyncHandler(async (req, res, next) => {
  const { username, password, info } = req.body;
  const loginMongo = new LoginMongo(username, password, info);
  const result = await loginMongo.save();
  res.json({ ...result });
});

const refresh = asyncHandler(async (req, res, next) => {
  const refreshC = new RefreshMongo(req.body.token, req.body.info);
  const accToken = await refreshC.generateJwt();
  res.json({ jwt: accToken });
});

const logout = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  const logoutC = new LogoutMongo(token, req);
  await logoutC.deleteToken();
  res.json({ status: true });
});

module.exports = { signup, login, refresh, logout };
