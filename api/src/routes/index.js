/** @format */

const { Router } = require('express');
const establishmentRoute = require('./routerEstablishment');
const siteRoute = require('./routerSite');
const userRoute = require('./routerUser');
const courtRoute = require("./routerCourt");
const cardsRoute = require('./routerCard');
const routerFindSport = require('./routerFindSport')
const routerFindLocation = require('./routerFindLocation')
// const routerFindName = require('./routerFindName')
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
router.use('/cards', cardsRoute);
router.use('/findsport', routerFindSport);
router.use('/findlocation', routerFindLocation)
// router.use('/findname', routerFindName)
router.use('/findlocation', routerFindLocation);
router.use('/mercadopago', routerMercadoPago);
router.use('/booking', bookingRoute)







module.exports = router;
