const { createPreference } =  require('../controllers/mercadopago.js');
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require("../middleware/auth");
const timeIp = require('../middleware/timeIp.js');
const router = require('express').Router();

//Ruta que genera la URL de MercadoPago
router.post("/", timeIp, userExtractor, authGoogle, createPreference) 

//Ruta que recibe la información del pago y crea la orden
// router.post("/new", newBooking)


module.exports = router;