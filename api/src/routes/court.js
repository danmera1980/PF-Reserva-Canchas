const { Router } = require('express');
const axios = require('axios');


const { postCourt } = require('../controllers/court');

const router = Router();

router.post('/', postCourt)

module.exports = router;