const { Router } = require('express');
const router = Router();

const {createSite, getAllSites, findByLocation} = require('../controllers/site')

const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')


const bodySchema = Joi.object({
    establishmentId: Joi.string().regex(/^[0-9]+$/).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(1).max(40).required(),
    country: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    city: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    street: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    streetNumber: Joi.number().min(1).integer().required(),
    latitude: Joi.number().allow(null),
    longitude: Joi.number().allow(null)
})



router.post('/', userExtractor, authGoogle,validator.body(bodySchema), createSite)
router.get('/location', findByLocation)
router.get('/:establishmentId', userExtractor, authGoogle, getAllSites)
router.get('/',getAllSites)

module.exports = router