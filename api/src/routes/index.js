const { Router } = require("express");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoute = require("./user");

const router = Router();

const Court = require("./court");

router.use("/users", userRoute);

router.use("/court", Court);
/*// en la ruta de creacion de las canchas o las reservas
const jwt = require("jsonwebtoken");

router.get("/canchaNueva", (req, res)=>{

const authorization = req.get("authorization")
let token = null
if(authorization && authorization.toLowerCase().startsWith(Bearer)){
    token = authorization.substring(7)
}

const decodedToken = jwt.verify(token, SECRET)

if (!token || !decodedToken.id){
    return res.status(401).jason({error: "token missing or invalid"})
}

});



*/


module.exports = router;
