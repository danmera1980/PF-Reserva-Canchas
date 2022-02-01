const bcrypt = require('bcrypt')
const { User } = require('../db');

// starting to code
const getAllUsers = async (req, res, next) => {
  try {
    res.send('aca van todos los usuarios enlistados')
  } catch (e) {
    next(e);
  }
};



const getUserByID = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};


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

module.exports = {
  getAllUsers,
  getUserByID,
  registerUser,

};
