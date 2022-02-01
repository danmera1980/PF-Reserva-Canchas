const { Router } = require('express');
const router = Router();
const {User} = require('../db');
const {getEstablishmentsFromDB, createEstablishment} = require('../controllers/establishment.js');

router.post('/', createEstablishment)

module.exports = router