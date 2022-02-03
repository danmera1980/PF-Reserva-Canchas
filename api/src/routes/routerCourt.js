const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const { postCourt,findBySport } = require('../controllers/court');

const bodySchema = Joi.object({
    siteId: Joi.string().regex(/^[a-zA-Z0-9-]+$/).min(2).max(40).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(2).max(40).required(),
    description: Joi.string().min(2).max(1000).required(),
    shiftLength: Joi.number().min(15).max(120).integer().required(),
    price: Joi.number().integer(),
    sport: Joi.string().valid('Basquet', 'Futbol 11', 'Futbol 7', 'Futbol 5', 'Tenis', 'Padel', 'Handbol', 'Squash'),
    image: Joi.array().items(Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).min(8)).allow(null),
})

router.post('/', validator.body(bodySchema), postCourt)
router.get('/', findBySport)

module.exports = router;