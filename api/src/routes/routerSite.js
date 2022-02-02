const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {createSite, findByLocation} = require('../controllers/site')

const bodySchema = Joi.object({
    establishmentId: Joi.string().regex(/^[0-9]+$/).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(2).max(40).required(),
    country: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(2).max(40).required(),
    city: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(2).max(40).required(),
    street: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(2).max(40).required(),
    streetNumber: Joi.number().min(1).integer().required(),
    latitude: Joi.number(),
    longitude: Joi.number()
})



router.post('/',validator.body(bodySchema), createSite)
router.get('/', findByLocation)

module.exports = router