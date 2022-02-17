const { Router } = require('express');
const router = Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const { postCourt, getAllCourts, getCourtById, updateStatusCourt} = require('../controllers/court');
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth');
const timeIp = require('../middleware/timeIp');

const bodySchema = Joi.object({
    siteId: Joi.string().regex(/^[a-zA-Z0-9-]+$/).min(2).max(40).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9 :]+$/).min(1).max(40).required(),
    description: Joi.string().min(2).max(1000).required(),
    shiftLength: Joi.number().min(15).max(120).integer().required(),
    price: Joi.number().integer(),
    sport: Joi.string().valid('Basquet', 'Futbol 11', 'Futbol 7', 'Futbol 5', 'Tenis', 'Padel', 'Handbol', 'Squash'),
    image: Joi.array().items(Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).min(8)).allow(null),
})

router.post('/', timeIp, userExtractor, authGoogle, validator.body(bodySchema), postCourt)
router.get('/', timeIp, getAllCourts)
router.get('/:id', timeIp, getCourtById)
router.put('/updateStatusCourt',timeIp, updateStatusCourt)

module.exports = router;