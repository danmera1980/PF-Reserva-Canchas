const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { isMyToken } = require("./utils");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  } else {
    next();
    return;
  }

  //hacer un jwt decode para ver los datos sin verificarlo asi veo el issuer ahi veo si es google o mio y ahi devido las verificaciones

  if (isMyToken (token)) {
    const decodedToken = jwt.verify(token, SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const { id: userId, email: userEmail } = decodedToken;
    req.id = userId;
    req.email = userEmail;
  }
  next();
};
