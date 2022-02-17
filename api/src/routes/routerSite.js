const { Router } = require('express');
const router = Router();

const {createSite, getAllSites, findByLocation, updateStatusSite} = require('../controllers/site')

const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth');
const timeIp = require('../middleware/timeIp');


const bodySchema = Joi.object({
    establishmentId: Joi.number().required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(1).max(40).required(),
    country: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    city: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    street: Joi.string().regex(/^[a-zA-Z0-9 :.]+$/).min(1).max(40).required(),
    streetNumber: Joi.number().min(1).integer().required(),
    latitude: Joi.number().allow(null),
    longitude: Joi.number().allow(null)
})



router.post('/', timeIp, userExtractor, authGoogle,validator.body(bodySchema), createSite)
router.get('/location', timeIp, findByLocation)
router.get('/:establishmentId', timeIp, userExtractor, authGoogle, getAllSites)
router.get('/', timeIp, getAllSites)
router.put('/updateStatusSite',updateStatusSite)

module.exports = router