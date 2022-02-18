const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const timeIp = require('../middleware/timeIp')
const { getAllBookings, newBooking, getCourtAvailability, getBookingsByEstablishment, courtBookings, getBookingsByEstId } = require("../controllers/booking");

const router = Router();

router.get("/", timeIp, getAllBookings);
router.get("/availability/:id", timeIp, getCourtAvailability);
router.get("/:courtId", timeIp, courtBookings)
// tratar de ver esto con Dan
router.get('/new/:userId/:courtId/:price/:startTime/:endTime', timeIp, newBooking)
// router.get('/byEstab/:establishmentId', timeIp, getBookingsByEstablishment)
router.get('/byEstab/:establishmentId', timeIp, getBookingsByEstId)

module.exports = router;
