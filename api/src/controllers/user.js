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
    const { name, email, password, hasEstablishment } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user) {
      throw new Error("Email previously registered");
    }
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      hasEstablishment,
    });
    res.send("Register ok");
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.params
    const { name, img, phone, hasEstablishment } = req.body;

    const updatedUser = await User.findOne({ where: { id } });
    if (!updatedUser) {
      throw Error("User not fund");
    }
    updatedUser.name = name;
    updatedUser.phone = phone;
    updatedUser.img = img;
    updatedUser.hasEstablishment= hasEstablishment
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
