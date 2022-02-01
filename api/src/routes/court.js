const { Router } = require('express');
const axios = require('axios');


const { postCourt,findBySport } = require('../controllers/court');

const router = Router();

router.post('/', postCourt)
router.get('/', findBySport)

module.exports = router;