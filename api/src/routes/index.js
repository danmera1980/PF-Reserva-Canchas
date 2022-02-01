const { Router } = require('express');
const axios = require('axios');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const user = require('./user')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoute = require("./user");

const router = Router();

const Court = require("./court");

router.use("/users", userRoute);
router.use('/establishment', routerEstablishment)
router.use('/site', routerSite)

router.use("/court", Court);

module.exports = router;
