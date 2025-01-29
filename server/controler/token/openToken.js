const jwt = require("jsonwebtoken");
const { getTokenFromHeader } = require(".");
const CustomError = require("../../helper/error/CustomError");
const { JWT_REFRESH_KEY, JWT_KEY } = process.env;

const openRefresh = (token) => {
  const decoded = open(token, 1);
  return decoded.username;
};

const openAccess = (token) => {
  const decoded = open(token, 0);
  return decoded.username;
};

const openReq = (req) => {
  const token = getTokenFromHeader(req);
  return openAccess(token);
};

const open = (token, type) =>{
  try{
    return jwt.verify(token, type ? JWT_REFRESH_KEY : JWT_KEY);
  }catch(e){
    throw CustomError.unAuthorized();
  }  
}

module.exports = { openRefresh, openAccess, openReq };
