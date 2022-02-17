const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {findByLocation} = require('../controllers/findByLocation');
const timeIp = require('../middleware/timeIp');

router.get('/', timeIp, findByLocation)

module.exports = router;