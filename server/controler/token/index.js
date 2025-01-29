const isTokenIncluded = req => req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
const getTokenFromHeader = req => req.headers.authorization.split(' ')[1];

module.exports = {
  isTokenIncluded,
  getTokenFromHeader
}