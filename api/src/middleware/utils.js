const jwt_decode = require("jwt-decode");

const isMyToken = function (token) {
  return jwt_decode(token).iss === "tuCanchaYa";
};


module.exports = {
  isMyToken,
};
