const bcrypt = require('bcrypt')
const { User } = require('../db');

// starting to code
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers =  await User.findAll()
    if(!allUsers.length){
      throw new Error("No users available");
    }
    res.send(allUsers)
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
    const { name, lastName, email, password, hasEstablishment } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user) {
      throw new Error("Email previously registered");
    }
    const newUser = await User.create({
      name,
      lastName,
      email,
      passwordHash,
      hasEstablishment,
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.params
    const { name, lastname, img, phone, hasEstablishment } = req.body;

    const updatedUser = await User.findOne({ where: { id } });
    if (!updatedUser) {
      throw Error("User not fund");
    }
    if(name) updatedUser.name = name;
    if(lastname) updatedUser.lastname = lastname;

    if(phone) updatedUser.phone = phone;
    if(img) updatedUser.img = img;
    if(hasEstablishment) updatedUser.hasEstablishment= hasEstablishment
    await updatedUser.save();

    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  registerUser,
  editUser,
};
