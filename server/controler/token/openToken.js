const jwt = require("jsonwebtoken");

const open = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);
  return decoded.username;
};

module.exports = {open};
