const asyncHandler = require('express-async-handler');
const CustomError = require('../../helper/error/CustomError');
const SignupMongo = require('../database/Mongo/SignupMongo');
const LoginMongo = require('../database/Mongo/LoginMongo');


//signup controler
const signup = asyncHandler(async (req, res, err) => {
  //getting the values from body
  const { name, username, email, password } = req.body;

  //controling is there any lose value
  //if (!name || !username || !email || !password) throw new CustomError('Bad request!', 400);

  const saveObj = new SignupMongo(name, username, email, password);

  let newUser = await saveObj.save();

  res.json(newUser);
})

const login = asyncHandler(async (req,res,err)=>{
  const {username,password,info} = req.body;
  const loginMongo = new LoginMongo(username,password,info);
  const result = await loginMongo.save();
  res.json(result);
})

module.exports = { signup,login };