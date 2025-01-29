const asyncHandler = require("express-async-handler");
const RelatedMongo = require("../database/Mongo/User/RelatedMongo");
const EditInfoMongo = require("../database/Mongo/User/EditInfoMongo");
const CustomError = require("../../helper/error/CustomError");
const PasswordUpdateMongo = require("../database/Mongo/User/PasswordUpdateMongo");

const related = asyncHandler(async (req, res, next) => {
  const username = req.username;
  const relatedUsersC = new RelatedMongo(username);
  const users = await relatedUsersC.getRelatedUsers();
  res.json({status:1, users});
});

const editInfo = asyncHandler(async (req,res,next)=>{
  const token = req.body.token;
  const code = Object.keys(req.body)[0];
  const value = req.body[code];
  if(!token || !code || (code != "bio" && value == '')) throw new CustomError("Bad Request!",400);
  const editInfoC = new EditInfoMongo(code,value,token,req);
  const newToken = await editInfoC.update();
  res.json({status:1,jwt:newToken});
});

const passwordUpdate = asyncHandler(async (req,res,next)=>{
  const token = req.body.token;
  const newPassword = req.body.password;
  if(!token && !newPassword) throw new CustomError("Bad Request!",400);
  const passwordUpdateC = new PasswordUpdateMongo(newPassword,token,req);
  const jwt = passwordUpdateC.update();
  res.json({status:1,jwt});
})

module.exports = { related,editInfo,passwordUpdate };
