const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const routerUser = require("./routerUser");
const routerCourt = require("./routerCourt");
const Card = require('./card');

router.use('/establishment', routerEstablishment)
router.use('/site', routerSite);
router.use('/court', routerCourt);
router.use("/users", routerUser);
router.use('/card', Card);

module.exports = router;
