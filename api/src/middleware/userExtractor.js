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

  if (isMyToken (token)) {
    const decodedToken = jwt.verify(token, SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    
    req.user = decodedToken;
  }
  next();
};
