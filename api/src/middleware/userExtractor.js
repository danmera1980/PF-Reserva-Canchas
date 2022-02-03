const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = (req, res, next)=>{
const authorization = req.get("authorization")
let token = null
if(authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7)
}

const decodedToken = jwt.verify(token, SECRET)

if (!token || !decodedToken.id){
    return res.status(401).json({error: "token missing or invalid"})
}

const { id: userId } = decodedToken
req.id = userId

next()

};


