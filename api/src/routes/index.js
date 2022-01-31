const { Router } = require('express');
const axios = require('axios');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoute = require('./user')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', userRoute);




module.exports = router;
