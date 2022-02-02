const { Router } = require('express');
const router = Router();
const {createSite, findByLocation, getAllSites} = require('../controllers/site')

router.post('/', createSite)
router.get('/', findByLocation)
router.get('/all', getAllSites)

module.exports = router