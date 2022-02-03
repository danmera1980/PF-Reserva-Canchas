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
    // ver esta porqueria que funcione con el idea que me manda el front y el que pido
    const validatedId = req.user.id
    const { id } = req.params

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
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    const {id} = req.user
    const { name, lastname, img, phone, hasEstablishment } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not fund");
    }
    name && (user.name = name)
    lastname && (user.lastname = lastname)
    img && (user.img = img)
    phone && (user.phone = phone)
    hasEstablishment && (user.hasEstablishment = hasEstablishment)
    await user.save()
    res.send(user);
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
