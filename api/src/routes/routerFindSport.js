const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {findBySport}= require('../controllers/findBySport')

router.get('/', findBySport)

module.exports = router;