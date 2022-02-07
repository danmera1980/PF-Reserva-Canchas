const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi');
const { findByName } = require('../controllers/findByName');

router.get('/', findByName)

module.exports = router;