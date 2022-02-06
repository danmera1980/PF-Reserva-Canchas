const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {getEstablishmentsFromDB, createEstablishment, getEstablishmentsName, addUserToEstablishment, getEstabIdByUserId} = require('../controllers/establishment.js');
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const {findByName} = require('../controllers/findByName')

const bodySchema = Joi.object({
    cuit: Joi.string().regex(/^[0-9]+$/).required(),
    userId: Joi.number(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(2).max(40).required(),
    logoImage: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).min(8).allow(''),
    timeActiveFrom: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    timeActiveTo: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    
})

router.get('/:userId', getEstabIdByUserId )
router.get('/',getEstablishmentsFromDB)
router.post('/', validator.body(bodySchema), createEstablishment)
router.get('/', findByName)
router.post('/', userExtractor, authGoogle, validator.body(bodySchema), createEstablishment)
router.get('/', getEstablishmentsName)
router.post('/addUserToEstablishment', addUserToEstablishment)

module.exports = router