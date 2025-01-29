const asyncHandler = require("express-async-handler");
const {
  isTokenIncluded,
  getTokenFromHeader,
} = require("../../controler/token");
const { openAccess } = require("../../controler/token/openToken");
const CustomError = require("../../helper/error/CustomError");

const tokenHandler = asyncHandler(async (req, res, next) => {
  if (!isTokenIncluded(req)) throw new CustomError("UnAuthorized", 401);
  const token = getTokenFromHeader(req);
  const username = openAccess(token);
  if(!username) throw CustomError.unAuthorized();
  req.username = username;
  next();
});

module.exports = tokenHandler;
