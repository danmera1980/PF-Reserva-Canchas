const { User } = require("../db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin, hasEstablishment } = req.body;
    const passwordHash = await(bcrypt.hash(password, 10))
    const user = await User.findOne({where:{email:email.toLowerCase()}})
    if (user){
        throw new Error ('Email previously registered')
    }
    const newUser = await User.create({
        name, email, passwordHash, isAdmin, hasEstablishment 
      }
    );
    res.send("Register ok") 

  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
    try {
        const { name, email, passwordHash, isAdmin, hasEstablishment } = req.body;

    } catch (error) {
        next(error)
    }
}


module.exports = {
  registerUser,
  loginUser
};
