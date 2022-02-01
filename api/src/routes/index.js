const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const userRoute = require("./user");
const Court = require("./court");

router.use('/establishment', routerEstablishment)
router.use('/site', routerSite)
router.use('/court', Court)
router.use("/users", userRoute);

module.exports = router;
