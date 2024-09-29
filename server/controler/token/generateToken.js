const jwt = require("jsonwebtoken");

const accessToken = (values)=>{
  const result =  jwt.sign(
    values,
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  return result;
}

const refreshToken = (values)=>{
  return jwt.sign(
    values,
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
}

module.exports = {
  accessToken,refreshToken
}
