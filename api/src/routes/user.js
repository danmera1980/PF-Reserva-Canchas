const {Router} = require("express");

const {getAllUsers, getUserByID} = require('../controllers/user');

const router = Router();


router.get('/', getAllUsers);
router.get('/:id', getUserByID);

module.exports = router;