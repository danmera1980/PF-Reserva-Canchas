const { Router } = require('express');
const router = Router();
const {createSite, findByLocation} = require('../controllers/site')

router.post('/', createSite)
router.get('/', findByLocation)

module.exports = router