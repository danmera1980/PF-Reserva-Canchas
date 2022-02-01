const { Router } = require("express");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoute = require("./user");

const router = Router();

const Court = require("./court");

router.use("/users", userRoute);

router.use("/court", Court);

module.exports = router;
