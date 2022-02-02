/** @format */

const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const userRoute = require('./routerUser');
const routerCourt = require("./routerCourt");
const routerCard = require('./routerCard');


router.use('/establishment', routerEstablishment);
router.use('/site', routerSite);
router.use('/court', routerCourt);
router.use('/users', userRoute);
router.use('/card', routerCard);


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
