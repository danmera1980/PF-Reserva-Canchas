const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const {getEstablishmentsFromDB, createEstablishment} = require('../controllers/establishment.js');

const bodySchema = Joi.object({
    id: Joi.string().regex(/^[0-9]+$/).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(2).max(40).required(),
    logoImage: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).min(8),
    rating: Joi.number().min(1),
    timeActiveFrom: Joi.number().min(0).max(23).required(),
    timeActiveTo: Joi.number().min(1).max(23).required(),
    responsableId: Joi.string().min(2).required()
})

//router.get('/',getEstablishmentsFromDB)
router.get('/:responsableId',getEstablishmentsFromDB)
router.post('/',validator.body(bodySchema), createEstablishment)

module.exports = router