const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID } = process.env;
const jwt_decode = require("jwt-decode");

const client = new OAuth2Client(CLIENT_ID);
const { User } = require("../db");
const { isMyToken } = require("./utils");

module.exports = async function (req, res, next) {
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  } else {
    next();
    return;
  }

  if (!isMyToken(token)) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const userData = ticket.payload;
      const [loggedUser, created] = await User.findOrCreate({
        where: { email: userData.email.toLowerCase() },
        defaults: {
          name: userData.given_name,
          lastName: userData.family_name,
          email: userData.email,
          img: userData.picture,
          passwordHash: userData.sub,
        },
      });

      req.user = loggedUser;
      console.log("end auth google")
      next();
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  }
};
