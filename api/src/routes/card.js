const { Router } = require('express');
const axios = require('axios');


const { getCards } = require('../controllers/card');

const router = Router();

router.get('/', getCards)

module.exports = router;