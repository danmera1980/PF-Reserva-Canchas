const { Router } = require('express');
const router = Router();
const {Establishment} = require('../db');
const {createSite} = require('../controllers/site')

router.post('/', createSite)

module.exports = router