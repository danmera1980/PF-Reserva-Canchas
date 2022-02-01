const { Router } = require('express');


const { findByLocation } = require('../controllers/site');

const router = Router();

router.get('/', findByLocation)

module.exports = router;