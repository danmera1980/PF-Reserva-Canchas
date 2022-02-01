const { Router } = require('express');
const axios = require('axios');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const user = require('./user')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const Court = require('./court');
const Card = require('./card');

router.use('/users', user);
router.use('/establishment', routerEstablishment)
router.use('/site', routerSite)

router.use('/court', Court)

router.use('/card', Card)




module.exports = router;
