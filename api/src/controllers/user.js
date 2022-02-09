
const { User } = require("../db");
const bcrypt = require("bcrypt");

// starting to code
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    if (!allUsers.length) {
      throw new Error("No users available");
    }
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
};

const getUserProfile = async (req, res, next) => {
  try {

    const id  = req.user.id;
    const wantedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["passwordHash"] },
    });
   
    res.send(wantedUser);
  } catch (e) {
    next(e);
  }
};

const registerGoogle = async (req, res, next) => {
  try {
    const user = req.user;
    console.log("entre y me vuelvo", user)
    res.status(200).json(user.id);
  } catch (e) {
    next(e);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
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
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, lastName, img, phone } = req.body;
    const changedUser = await User.findOne({ where: { id } });
    if (!changedUser) {
      throw new Error("User not fund");
    }
    name && (changedUser.name = name);
    lastName && (changedUser.lastName = lastName);
    img && (changedUser.img = img);
    phone && (changedUser.phone = phone);

    await changedUser.save();
    console.log(changedUser.name);

    res.status(200).json({ changedUser });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  registerUser,
  editUser,
  registerGoogle,
  };
