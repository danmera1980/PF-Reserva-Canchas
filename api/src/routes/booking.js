const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const { getAllBookings, newBooking, getCourtAvailability } = require("../controllers/booking");
const timeIp = require("../middleware/timeIp");

const router = Router();

router.get("/", timeIp, getAllBookings);
router.get("/availability/:id", timeIp, getCourtAvailability);
// tratar de ver esto con Dan
router.get('/new/:userId/:courtId/:price/:startTime/:endTime', timeIp, newBooking)
module.exports = router;
