const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const { getAllBookings, newBooking } = require("../controllers/bookings");

const router = Router();

router.get("/", getAllBookings);
router.post('/new', userExtractor, authGoogle, newBooking)
module.exports = router;
