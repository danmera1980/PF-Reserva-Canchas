const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
SECRET
} = process.env;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    const passwordOk = user === null? false: await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordOk)) {
      throw new Error("User or Password Invalid");
    }

    const userForToken = {
      id: user.id,
      name:user.name,
      email: user.email
    }

    const token = jwt.sign(userForToken, SECRET)

    res.send( {
      id: user.id,
      name:user.name,
      email: user.email,
      token
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
};
