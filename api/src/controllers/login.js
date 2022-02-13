const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = process.env;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    const passwordOk =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordOk)) {
      throw new Error("User or Password Invalid");
    }

    const userForToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      iss: "tuCanchaYa",
    };

    const token = jwt.sign(userForToken, SECRET);

    res.send({
      id: user.id,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const checkedEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUser,
  checkedEmail,
};
