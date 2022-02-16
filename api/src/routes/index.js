/** @format */

const { Router } = require('express');
const establishmentRoute = require('./routerEstablishment');
const siteRoute = require('./routerSite');
const userRoute = require('./routerUser');
const courtRoute = require("./routerCourt");
const routerFindLocation = require('./routerFindLocation')
const bookingRoute = require('./booking')

const routerMercadoPago = require('./routerMercadoPago')

const router = Router();

const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/establishment', establishmentRoute);
router.use('/site', siteRoute);
router.use('/court', courtRoute);
router.use('/users', userRoute);
router.use('/findlocation', routerFindLocation);
router.use('/mercadopago', routerMercadoPago);
router.use('/booking', bookingRoute)







module.exports = router;
