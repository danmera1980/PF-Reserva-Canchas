const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const timeIp = require('../middleware/timeIp')
const { getAllBookings, newBooking, getCourtAvailability, getBookingsByEstablishment, courtBookings, getBookingsByEstId, addBooking } = require("../controllers/booking");

const router = Router();

router.get("/", timeIp, getAllBookings);
router.get("/availability/:id", timeIp, getCourtAvailability);
router.get("/:courtId", timeIp, courtBookings)
router.get('/new/:userId/:courtId/:price/:startTime/:endTime', timeIp, newBooking)
router.get('/byEstab/:establishmentId', timeIp, getBookingsByEstablishment)
router.get('/byEstabId/:estId', timeIp, getBookingsByEstId)
router.post('/addgit ', timeIp, addBooking)

module.exports = router;
