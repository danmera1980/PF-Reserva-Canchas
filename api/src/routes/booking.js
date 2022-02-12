const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const { getAllBookings, newBooking, getCourtAvailability } = require("../controllers/booking");

const router = Router();

router.get("/", getAllBookings);
router.get("/availability/:id", getCourtAvailability);

router.get('/new/:userId/:courtId/:price/:startTime/:endTime', newBooking)
module.exports = router;
