const { Router } = require('express');
const axios = require('axios');
const routerEstablishment = require('./routerEstablishment');
const routerHeadquarter = reuire('/routerHeadquarter')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const Court = require('./court');

router.use('/users', User);
router.use('/establishments', routerEstablishment)
router.use('/headquarters', routerHeadquarter)

router.use('/court', Court)




module.exports = router;
