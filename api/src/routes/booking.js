const { Router } = require("express");
const userExtractor = require("../middleware/userExtractor");
const authGoogle = require('../middleware/auth')
const { getAllBookings, newBooking, getCourtAvailability, getBookingsByEstablishment, courtBookings } = require("../controllers/booking");

const router = Router();

router.get("/", getAllBookings);
router.get("/availability/:id", getCourtAvailability);
router.get("/:courtId", courtBookings)

// tratar de ver esto con Dan
router.get('/new/:userId/:courtId/:price/:startTime/:endTime', newBooking)
router.get('/:establishmentId', getBookingsByEstablishment)
module.exports = router;
