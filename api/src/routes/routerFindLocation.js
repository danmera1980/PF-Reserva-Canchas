const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {findByLocation} = require('../controllers/findByLocation')

router.get('/', findByLocation)

module.exports = router;