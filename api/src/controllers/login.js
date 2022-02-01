const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  try {
    const { email, passwordHash } = req.body;
    const user = await User.findOne({email}) 
    if (!(user && (password === user.password))){
        throw new Error('password or user invalid')
    }


  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
};
