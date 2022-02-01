const { Router } = require('express');
const axios = require('axios');
const routerEstablishment = require('./routerEstablishment');
const routerHeadquarter = require('./routerHeadquarter');
const user = require('./user')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const Court = require('./court');

router.use('/users', user);
router.use('/establishment', routerEstablishment)
router.use('/headquarter', routerHeadquarter)

router.use('/court', Court)




module.exports = router;
