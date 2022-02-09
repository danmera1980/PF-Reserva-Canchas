/** @format */

const { Router } = require('express');
const routerEstablishment = require('./routerEstablishment');
const routerSite = require('./routerSite');
const userRoute = require('./routerUser');
const routerCourt = require("./routerCourt");
const routerCard = require('./routerCard');
const routerFindSport = require('./routerFindSport')
const routerFindLocation = require('./routerFindLocation')
const routerFindName = require('./routerFindName')
const routerMercadoPago = require('./routerMercadoPago')

const router = Router();

const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/establishment', routerEstablishment);
router.use('/site', routerSite);
router.use('/court', routerCourt);
router.use('/users', userRoute);
router.use('/cards', routerCard);
router.use('/findsport', routerFindSport);
router.use('/findlocation', routerFindLocation)
router.use('/mercadopago', routerMercadoPago)






module.exports = router;
